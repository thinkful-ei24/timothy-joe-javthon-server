const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.user.id;

  return User.findOne({ _id: id })
    .then(user => {
      if(!user){
        return Promise.reject();
      }

      const head = user.head;
      const question = user.questions[head];
      return res.json(question);
    })
    .catch(next);
});


router.put('/', express.json(), (req, res, next) => {
  //Store user id so we can find it later on when we query our database.
  const id = req.user.id;

  //This endpoint runs if a question was answered correctly,
  //therefore we check wether it was in fact answered correctly
  //inside the JSON object from the request body. If not, error out.
  if(!('answeredCorrectly' in req.body)){
    const err = new Error('`answeredCorrectly` field is required');
    err.status = 422;
    return next(err);
  }

  //Store the body into a variable, which should be a boolean.
  const { answeredCorrectly } = req.body;
  
  if(typeof answeredCorrectly !== 'boolean'){
    const err = new Error('`answeredCorrectly` field must be boolean');
    err.status = 422;
    return next(err);
  }


  //Meat and potatoes function, let's use mongoose to navigate our MongoDB in order to
  //find the current user, and then change the correct answers data.
  return User.findOne({ _id: id })
    .then(user => {
      if(!user) return Promise.reject();

      //Notice the head: answered. In order to make the algorithm, we will place the questions
      //in a linked list, which will change depending on the mvalue of the question, explained below
      let { head: answered, questions } = user;

      // Update success, attempts and memory strength properties on answered question

      //Let's check the question answered and increment the number of attempts,
      //wether wrong or right, if right however, also increment the number of
      //succesful answers to that question.
      const answeredQ = questions[answered];
      answeredQ.numberOfAttempts += 1;
      answeredQ.numberOfSuccesses += answeredCorrectly ? 1 : 0;

      //There's a property in each question called an "m value". The stronger this value is
      //the more the user knows it, so we won't show this question as frequently.
      //Each time the specific question is answered correctly, let's multiply this
      //value by 2, if wrong, change it to 1.
      answeredQ.mValue = answeredCorrectly ? answeredQ.mValue * 2 : 1;

      // 
      //Let's traverse the linked list and go to the next question in line.
      user.head = questions[answered].next;

      //Traverse through the questions on the linked list
      let temp = questions[user.head];
      let i = 1;
      while(temp.next !== null && i < answeredQ.mValue){
        temp = questions[temp.next];
        i++;
      }

      // After the while loop finds a question with the m value of 1, let's make that question go
      //right after the current question on the linked list, so that the low m value question gets
      //asked next, since the user doesn't seem to get it right most of the time.
      questions[answered].next = temp.next;
      temp.next = answered;
      
      return user.save();
    })
    .then(() => {
      //If user info is saved, return a 204.
      return res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;