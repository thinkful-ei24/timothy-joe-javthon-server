const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const questionSchema = require('./question');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  questions: [questionSchema],
  head: {
    type: Number,
    default: 0
  }
});

userSchema.statics.hashPassword = function(password){
  return bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function(password){
  return bcrypt.compare(password, this.password);
};

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result._id;
    delete result._v;
    delete result.password;
    delete result.questions;
  }
});

module.exports = mongoose.model('User', userSchema);