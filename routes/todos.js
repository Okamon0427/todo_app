const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Todo = require('../models/Todo');

// @Route  POST api/todos
// @desc   Create todo
// @access Private
router.post(
  '/',
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('status', 'Status is required')
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
        title,
        dueDate,
        status,
        category
      });

      const newTodo = await newTodoObject.save();

      res.json(newTodo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route  GET api/todos
// @desc   Get all todos
// @access Private
router.get('/', async (req, res) => {
  try {
    const allTodos = await Todo.find().sort({ createdAt: -1 });
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route  PUT api/todos/:todoId
// @desc   Update todo by Todo Id
// @access Private
router.put(
  '/:todoId',
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('status', 'Status is required')
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
        return res.status(404).json({ msg: 'Todo not found' });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.todoId,
        req.body,
        { new: true }
      );

      res.json(updatedTodo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route  DELETE api/todos/:todoId
// @desc   Delete todo by Todo Id
// @access Private
router.delete('/:todoId', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    await todo.remove();

    res.json({ msg: 'Todo Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;