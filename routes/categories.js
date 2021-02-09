const express = require('express');
const {
  addCategory,
  getCategoriesByUser,
  getCategory,
  editCategory,
  deleteCategory
} = require('../controllers/categories');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const router = express.Router();

router.post('/', auth, validation('addCategory'), addCategory);
router.get('/', auth, getCategoriesByUser);
router.get('/:categoryId', auth, getCategory);
router.put('/:categoryId', auth, validation('editCategory'), editCategory);
router.delete('/:categoryId', auth, deleteCategory);

module.exports = router;