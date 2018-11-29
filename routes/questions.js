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
  const id = req.user.id;

  if(!('answeredCorrectly' in req.body)){
    const err = new Error('`answeredCorrectly` field is required');
    err.status = 422;
    return next(err);
  }

  const { answeredCorrectly } = req.body;
  
  if(typeof answeredCorrectly !== 'boolean'){
    const err = new Error('`answeredCorrectly` field must be boolean');
    err.status = 422;
    return next(err);
  }

  return User.findOne({ _id: id })
    .then(user => {
      if(!user) return Promise.reject();

      let { head: answered, questions } = user;

      // update success, attempts and memory strength properties on answered question

      const answeredQ = questions[answered];
      answeredQ.numberOfAttempts += 1;
      answeredQ.numberOfSuccesses += answeredCorrectly ? 1 : 0;
      answeredQ.mValue = answeredCorrectly ? answeredQ.mValue * 2 : 1;

      // set head to the next question
      user.head = questions[answered].next;

      // traverse to the mth question in the linked list
      let temp = questions[user.head];
      let i = 1;
      while(temp.next !== null && i < answeredQ.mValue){
        temp = questions[temp.next];
        i++;
      }

      // insert answered question after the mth question
      questions[answered].next = temp.next;
      temp.next = answered;
      
      return user.save();
    })
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(next);

});

module.exports = router;