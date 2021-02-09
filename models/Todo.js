const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { VALIDATION_MESSAGE } = require('../utils/constants');

const {
  USER_REQUIRED,
  TITLE_REQUIRED
} = VALIDATION_MESSAGE;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, USER_REQUIRED]
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  title: {
    type: String,
    required: [true, TITLE_REQUIRED],
    maxlength: 50,
  },
  dueDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);