const express = require('express');
const jwt = require('../strategies/jwt');
const User = require('../models/user');

const router = express.Router();
router.use(jwt);

router.get('/', (req, res, next) => {
  const id = req.user.id;
  return User.findOne({ _id: id })
    .then(user => {
      const questions = user.questions;
      const question = questions.length ? questions[0] : null;
      return res.json(question);
    })
    .catch(next);
});

router.put('/:id', express.json(),(req, res, next) => {
  const id = req.user.id;
  const questionId = req.params.id;
  const { numberOfSuccesses, numberOfAttempts } = req.body;
  
  return User.findOneAndUpdate(
    { _id: id, 'questions._id': questionId },
    { $set: 
      { 
        'questions.$.numberOfSuccesses': numberOfSuccesses, 
        'questions.$.numberOfAttempts': numberOfAttempts 
      }
    },
    { new: true }
  )
    .then(user => {
      return res.json(user.questions);
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
      return res.status(201).json(user.questions);
    })
    .catch(next);
});



module.exports = router;