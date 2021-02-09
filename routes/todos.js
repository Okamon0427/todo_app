const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

const {
  titleRequired,
  titleTodoMaxLength,
} = VALIDATION_MESSAGE;
const {
  todoNotFound,
  todoAuthError,
  todoDeleted,
} = ERROR_MESSAGE;

// @Route  POST api/todos
// @desc   Create todo
// @access Private
router.post('/', auth,
  [
    check('title', titleRequired)
      .not()
      .isEmpty(),
    check('title', titleTodoMaxLength)
      .isLength({ max: 50 }),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
  })
);

// @Route  GET api/todos
// @desc   Get all todos by user ID
// @access Private
router.get('/', auth,
  asyncHandler(async (req, res) => {
    const allTodos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(allTodos);
  })
);

// @Route  GET api/todos/:categoryId
// @desc   Get all todos by category ID
// @access Private
router.get('/:categoryId', auth,
  asyncHandler(async (req, res) => {
    const todos = await Todo.find({
      user: req.user.id,
      category: req.params.categoryId
    }).sort({ createdAt: -1 });
    res.json(todos);
  })
);

// @Route  PUT api/todos/:todoId
// @desc   Update todo by Todo Id
// @access Private
router.put('/:todoId', auth,
  [
    check('title', titleRequired)
      .not()
      .isEmpty(),
    check('title', titleTodoMaxLength)
      .isLength({ max: 50 }),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return next(new ExpressError(todoNotFound, 404));
    }

    if (todo.user.toString() !== req.user.id) {
      return next(new ExpressError(todoAuthError, 401));
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      { new: true, runValidators: true },
    );

    res.json(updatedTodo);
  })
);

// @Route  DELETE api/todos/:todoId
// @desc   Delete todo by Todo Id
// @access Private
router.delete('/:todoId', auth,
  asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return next(new ExpressError(todoNotFound, 404));
    }

    if (todo.user.toString() !== req.user.id) {
      return next(new ExpressError(todoAuthError, 401));
    }

    await todo.remove();

    res.json({ msg: todoDeleted });
  })
);

module.exports = router;