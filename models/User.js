const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const { VALIDATION_MESSAGE } = require('../utils/constants');

const {
  USER_NAME_REQUIRED,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED
} = VALIDATION_MESSAGE;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, USER_NAME_REQUIRED]
  },
  email: {
    type: String,
    required: [true, EMAIL_REQUIRED],
  },
  password: {
    type: String,
    required: [true, PASSWORD_REQUIRED],
    minlength: 6
  },
  avatar: {
    url: {
      type: String
    },
    filename: {
      type: String
    }
  },
  role: {
    type: String,
    enum: ['user', 'test'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compare password entered by user and password in database
UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Encrypt password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Delete Categories and todos related to User when the User is deleted
UserSchema.pre('remove', async function (next) {
  await this.model('category').deleteMany({ user: this._id });
  await this.model('todo').deleteMany({ user: this._id });
  next();
});

module.exports = User = mongoose.model('user', UserSchema);