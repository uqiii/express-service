const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the user name']
    },
    email: {
      type: String,
      required: [true, 'Please add the user email address'],
      unique: [true, 'Email address already taken']
    },
    phone: {
      type: String,
      required: [true, 'Please add the user phone number'],
      unique: [true, 'Phone number already taken']
    },
    password: {
      type: String,
      required: [true, 'Please add the user password']
    },
    position: {
      type: String,
      required: [true, 'Please add the user position']
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
