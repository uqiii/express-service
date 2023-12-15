const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the admin name']
    },
    email: {
      type: String,
      required: [true, 'Please add the admin email address'],
      unique: [true, 'Email address already taken']
    },
    password: {
      type: String,
      required: [true, 'Please add the admin password']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Admin', adminSchema);
