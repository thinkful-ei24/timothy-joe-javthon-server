const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res, next) => {

  const id = req.user.id;

  User.findOne({ _id: id })
    .then(user => {
      if(!user) return Promise.reject();
      
      const questions = user.questions;
      const stats = questions.map(question => ({
        answer: question.answer,
        numberOfSuccesses: question.numberOfSuccesses
      }));

      return res.json(stats);
    })
    .catch(next);
});

module.exports = router;