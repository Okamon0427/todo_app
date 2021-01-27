const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { VALIDATION_MESSAGE } = require('../utils/constants');

const {
  userRequired,
  titleRequired
} = VALIDATION_MESSAGE;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, userRequired]
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  title: {
    type: String,
    required: [true, titleRequired]
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Done'],
    default: 'In Progress'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);