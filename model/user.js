const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  isGateKeeper: {
    type: Boolean,
    required: true,
    default: false
  },
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
