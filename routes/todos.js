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

      const newTodo = new Todo({
        title,
        dueDate,
        status,
        category
      });

      const todo = await newTodo.save();

      res.json(todo);
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
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
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
      let todo = await Todo.findById(req.params.todoId);

      if (!todo) {
        throw new Error();
      }

      todo = await Todo.findByIdAndUpdate(
        req.params.todoId,
        req.body,
        { new: true }
      );

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;