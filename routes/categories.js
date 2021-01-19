const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Category = require('../models/Category');

// @Route  POST api/categories
// @desc   Create category
// @access Private
router.post(
  '/',
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

      const existTitle = await Category.find({ title });
      if (existTitle) {
        return res.status(401).json({ msg: 'Title already exists' });
      }

      const newCategoryObject = new Category({
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
// @desc   GET all category
// @access Private
router.get('/', async (req, res) => {  
  try {
    const allCategories = await Category.find().sort({ createdAt: -1 });;
    res.json(allCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route  GET api/categories/categoryId
// @desc   GET categories by category ID
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

module.exports = router;