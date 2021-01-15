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
      const { title, dueDate, status } = req.body;

      const newTodo = new Todo({
        title,
        dueDate,
        status
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;