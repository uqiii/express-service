const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: [true, 'Please add the user id']
    },
    checkIn: {
      type: Date,
      required: [true, 'Please add the admin email address']
    },
    checkOut: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Presence', adminSchema);
