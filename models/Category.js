const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { VALIDATION_MESSAGE } = require('../utils/constants');

const {
  userRequired,
  titleRequired
} = VALIDATION_MESSAGE;

const CategorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, userRequired]
  },
  title: {
    type: String,
    required: [true, titleRequired],
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Delete Todos related to Category when the Category is deleted
CategorySchema.pre('remove', async function (next) {
  await this.model('todo').deleteMany({ category: this._id });
  next();
});

module.exports = Category = mongoose.model('category', CategorySchema);