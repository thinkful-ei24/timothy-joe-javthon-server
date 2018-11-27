const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: { 
    type: String,
    required: true  
  },
  answer: {
    type: String,
    required: true
  },
  memoryStrength: {
    type: Number,
    default: 1
  },
  numberOfSuccesses: {
    type: Number,
    default: 0
  },
  numberOfAttempts: {
    type: Number,
    default: 0
  },
  next: {
    type: Number
  }
});

questionSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result._id;
    delete result._v;
  }
});

module.exports = questionSchema;

