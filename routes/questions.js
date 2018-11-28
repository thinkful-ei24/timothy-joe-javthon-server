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

  const requiredFields = ['numberOfSuccesses', 'numberOfAttempts', 'memoryStrength'];
  const missingField = requiredFields.find(field => !(field in req.body));
  if(missingField){
    const err = new Error(`${missingField} is missing`);
    err.status = 422;
    return next(err);
  }

  const { numberOfSuccesses, numberOfAttempts, memoryStrength } = req.body;

  if(memoryStrength <= 0) {
    const err = new Error('Memory strength cannot be less than 1');
    err.status = 422;
    return next(err);
  }

  const atleastZero = ['numberOfSuccesses', 'numberOfAttempts'];
  const tooLow = atleastZero.find(field => req.body[field] < 0);

  if(tooLow){
    const err = new Error(`${tooLow} cannot be less than zero`);
    err.status = 422;
    return next(err);
  }

  if(numberOfAttempts < numberOfSuccesses){
    const err = new Error('numberOfAttempts cannot be less than numberOfSuccesses');
    err.status = 422;
    return next(err);
  }

  return User.findOne({ _id: id })
    .then(user => {
      if(!user) return Promise.reject();

      let { head: answered, questions } = user;

      // update success, attempts and memory strength properties on answered question

      questions[answered].numberOfAttempts = numberOfAttempts;
      questions[answered].numberOfSuccesses = numberOfSuccesses;
      questions[answered].memoryStrength = memoryStrength;

      // set head to the next question
      user.head = questions[answered].next;

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