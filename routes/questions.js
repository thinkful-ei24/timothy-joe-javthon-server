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
      const headIndex = user.head;
      const question = user.questions[headIndex];
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

      // change head to next node

      const oldHead = head;
      user.head = questions[head].next;

      // traverse to the m-1st node in the linked list
      let temp = questions[user.head];

      let i = 1;
      while(temp.next !== null && i < memoryStrength){
        temp = questions[temp.next];
        i++;
      }

      // set the next property on the m-1st node to old head
      // set next property on head to m-1st node's next
      questions[oldHead].next = temp.next;
      temp.next = oldHead;
      
      return user.save();
    })
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(next);

});



// router.put('/:id', express.json(),(req, res, next) => {
//   const id = req.user.id;
//   const questionId = req.params.id;
//   const { numberOfSuccesses, numberOfAttempts } = req.body;
  
//   return User.findOneAndUpdate(
//     { _id: id, 'questions._id': questionId },
//     { $set: 
//       { 
//         'questions.$.numberOfSuccesses': numberOfSuccesses, 
//         'questions.$.numberOfAttempts': numberOfAttempts 
//       }
//     },
//     { new: true }
//   )
//     .then(user => {
//       if(!user) return Promise.reject();
//       const question = user.questions.filter(question => question.id === questionId);
//       return res.json(question);
//     })
//     .catch(next);
// });

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