const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const GENDERS = ["M", "F"];

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: 'String',
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  },
  gender: {
    type: String, enum: GENDERS
  },
  dob:{
    type :Date
  }

});


// encrypt password
userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
      next();
    } else {
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) {
          // console.log('Error hashing password for user', user.username);
          next(err);
        } else {
          user.password = hash;
          next();
        }
      });
    }
  });


module.exports = mongoose.model('User', userSchema);