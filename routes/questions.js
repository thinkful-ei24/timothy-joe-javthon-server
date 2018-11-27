const express = require('express');
const jwt = require('../strategies/jwt');
const User = require('../models/user');

const router = express.Router();
router.use(jwt);

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
  const id = req.user.id;
  const { numberOfSuccesses, numberOfAttempts, memoryStrength } = req.body;

  return User.findOne({ _id: id })
    .then(user => {
      if(!user) return Promise.reject();
      let { head, questions } = user;

      // update success, attempts and memory strength properties on head node

      questions[head].numberOfAttempts = numberOfAttempts;
      questions[head].numberOfSuccesses = numberOfSuccesses;
      questions[head].memoryStrength = memoryStrength;

      // change head to next question
      const answered = head;
      user.head = questions[head].next;

      // traverse to the mth question in the linked list
      let temp = questions[user.head];
      let i = 1;
      while(temp.next !== null && i < memoryStrength){
        temp = questions[temp.next];
        i++;
      }

      // insert answered question after the mth question
      questions[answered].next = temp.next;
      temp.next = answered;
      
      return user.save();
    })
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(next);

});

router.post('/', express.json(), (req, res, next) => {
  const id = req.user.id;
  const { question, answer } = req.body;

  const requiredFields = ['question', 'answer'];
  const missingField = requiredFields.find(field => !(field in req.body));
  if(missingField) {
    const err = new Error(`${missingField} field is missing`);
    err.status = 400;
    return next(err);
  }

  const newQuestion = {
    question, 
    answer
  };

  return User.findOneAndUpdate(
    { _id: id }, 
    { $push: { questions: newQuestion } },
    { new: true }
  )
    .then(user => {
      if(!user) return Promise.reject();
      return res.status(201).json(user.questions);
    })
    .catch(next);
});



module.exports = router;