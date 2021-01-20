const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
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