const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

const {
  titleRequired,
  statusRequired
} = VALIDATION_MESSAGE;
const {
  todoNotFound,
  todoAuthError,
  todoDeleted,
  serverError
} = ERROR_MESSAGE;

// @Route  POST api/todos
// @desc   Create todo
// @access Private
router.post('/', auth,
  [
    check('title', titleRequired)
      .not()
      .isEmpty(),
    check('status', statusRequired)
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, dueDate, status, category } = req.body;

      const newTodoObject = new Todo({
        user: req.user.id,
        title,
        dueDate,
        status,
        category
      });

      const newTodo = await newTodoObject.save();

      res.json(newTodo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

// @Route  GET api/todos
// @desc   Get all todos by user ID
// @access Private
router.get('/', auth,
  async (req, res) => {
    try {
      const allTodos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
      res.json(allTodos);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

// @Route  PUT api/todos/:todoId
// @desc   Update todo by Todo Id
// @access Private
router.put('/:todoId', auth,
  [
    check('title', titleRequired)
      .not()
      .isEmpty(),
    check('status', statusRequired)
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todo = await Todo.findById(req.params.todoId);
      if (!todo) {
        return res.status(404).json({ msg: todoNotFound });
      }

      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: todoAuthError });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.todoId,
        req.body,
        { new: true }
      );

      res.json(updatedTodo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

// @Route  DELETE api/todos/:todoId
// @desc   Delete todo by Todo Id
// @access Private
router.delete('/:todoId', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ msg: todoNotFound });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: todoAuthError });
    }

    await todo.remove();

    res.json({ msg: todoDeleted });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverError);
  }
});

module.exports = router;