const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Done'],
    default: 'In Progress'
  },
  category: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);