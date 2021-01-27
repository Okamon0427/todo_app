const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { VALIDATION_MESSAGE } = require('../utils/constants');

const {
  userNameRequired,
  emailRequired,
  passwordRequired
} = VALIDATION_MESSAGE;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, userNameRequired]
  },
  email: {
    type: String,
    required: [true, emailRequired],
    unique: true
  },
  password: {
    type: String,
    required: [true, passwordRequired],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Delete Categories and todos related to User when the User is deleted
UserSchema.pre('remove', async function (next) {
  await this.model('category').deleteMany({ user: this._id });
  await this.model('todo').deleteMany({ user: this._id });
  next();
});

module.exports = User = mongoose.model('user', UserSchema);