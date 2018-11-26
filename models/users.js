const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  email: {
    type: String,
    required: true
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
  }
});


module.export = userSchema;