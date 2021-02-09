const express = require('express');
const {
  addTodo,
  getAllTodos,
  getTodosByCategory,
  editTodo,
  deleteTodo
} = require('../controllers/todos');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
  
const router = express.Router();

router.post('/', auth, validation('addTodo'), addTodo);
router.get('/', auth, getAllTodos);
router.get('/:categoryId', auth, getTodosByCategory);
router.put('/:todoId', auth, validation('editTodo'), editTodo);
router.delete('/:todoId', auth, deleteTodo);

module.exports = router;