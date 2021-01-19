const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Category = require('../models/Category');

// @Route  POST api/categories
// @desc   Create category
// @access Private
router.post('/', auth,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const { title } = req.body;

      const existTitle = await Category.find();
      if (existTitle && existTitle.length > 0) {
        return res.status(401).json({ msg: 'Title already exists' });
      }

      const newCategoryObject = new Category({
        user: req.user.id,
        title,
      });

      const newCategory = await newCategoryObject.save();

      res.json(newCategory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route  GET api/categories
// @desc   GET all categories by user ID
// @access Private
router.get('/', auth,
  async (req, res) => {  
  try {
    const allCategories = await Category.find({ user: req.user.id }).sort({ createdAt: -1 });;
    res.json(allCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route  GET api/categories/:categoryId
// @desc   GET category by category ID
// @access Private
router.get('/:categoryId', async (req, res) => {  
  try {
    const categories = await Category.findById(
      req.params.categoryId
    )
      .sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route  PUT api/categories/:categoryId
// @desc   Update category by category ID
// @access Private
router.put('/:categoryId',
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const category = await Category.findById(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }

      if (category.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'This category is not yours' });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        { new: true }
      );

      res.json(updatedCategory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route  DELETE api/categories/:categoryId
// @desc   Delete category
// @access Private
router.delete('/:categoryId', async (req, res) => {  
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'This category is not yours' });
    }

    await category.remove();
    res.json({ msg: 'Category Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;