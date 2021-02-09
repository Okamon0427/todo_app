const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const Todo = require('../models/Todo');

const {
  TODO_NOT_FOUND,
  TODO_AUTH_ERROR,
  TODO_DELETED
} = ERROR_MESSAGE;

// @Route  POST api/todos
// @desc   Create todo
// @access Private
exports.addTodo = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  const { title, dueDate, category } = req.body;

  const newTodoObject = new Todo({
    user: req.user.id,
    title,
    dueDate,
    category
  });

  const newTodo = await newTodoObject.save();

  res.json(newTodo);
});

// @Route  GET api/todos
// @desc   Get all todos by user ID
// @access Private
exports.getAllTodos = asyncHandler(async (req, res) => {
  const allTodos = await Todo.find({
    user: req.user.id
  }).sort({ createdAt: -1 });
  res.json(allTodos);
});

// @Route  GET api/todos/:categoryId
// @desc   Get all todos by category ID
// @access Private
exports.getTodosByCategory = asyncHandler(async (req, res) => {
  const todos = await Todo.find({
    user: req.user.id,
    category: req.params.categoryId
  }).sort({ createdAt: -1 });
  res.json(todos);
});

// @Route  PUT api/todos/:todoId
// @desc   Update todo by Todo Id
// @access Private
exports.editTodo = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  const todo = await Todo.findById(req.params.todoId);
  if (!todo) {
    return next(new ExpressError(TODO_NOT_FOUND, 404));
  }

  if (todo.user.toString() !== req.user.id) {
    return next(new ExpressError(TODO_AUTH_ERROR, 401));
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.todoId,
    req.body,
    { new: true, runValidators: true },
  );

  res.json(updatedTodo);
});

// @Route  DELETE api/todos/:todoId
// @desc   Delete todo by Todo Id
// @access Private
exports.deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.todoId);
  if (!todo) {
    return next(new ExpressError(TODO_NOT_FOUND, 404));
  }

  if (todo.user.toString() !== req.user.id) {
    return next(new ExpressError(TODO_AUTH_ERROR, 401));
  }

  await todo.remove();

  res.json({ msg: TODO_DELETED });
});