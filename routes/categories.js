const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');
const auth = require('../middleware/auth');
const Category = require('../models/Category');

const {
  titleRequired,
} = VALIDATION_MESSAGE;
const {
  categoryNotFound,
  categoryAuthError,
  categoryExists,
  categoryDeleted,
  serverError
} = ERROR_MESSAGE;

// @Route  POST api/categories
// @desc   Create category
// @access Private
router.post('/', auth,
  [
    check('title', titleRequired)
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

      const existTitle = await Category.find({ title, user: req.user.id });
      if (existTitle && existTitle.length > 0) {
        return res.status(401).json({ msg: categoryExists });
      }

      const newCategoryObject = new Category({
        user: req.user.id,
        title,
      });

      const newCategory = await newCategoryObject.save();

      res.json(newCategory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

// @Route  GET api/categories
// @desc   GET all categories by user ID
// @access Private
router.get('/', auth,
  async (req, res) => {  
  try {
    const allCategories = await Category.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(allCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverError);
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
    res.status(500).send(serverError);
  }
});

// @Route  PUT api/categories/:categoryId
// @desc   Update category by category ID
// @access Private
router.put('/:categoryId', auth,
  [
    check('title', titleRequired)
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
        return res.status(404).json({ msg: categoryNotFound });
      }

      if (category.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: categoryAuthError });
      }

      const existTitle = await Category.find({ title, user: req.user.id });
      if (existTitle && existTitle.length > 0) {
        return res.status(401).json({ msg: categoryExists });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        { new: true }
      );

      res.json(updatedCategory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

// @Route  DELETE api/categories/:categoryId
// @desc   Delete category
// @access Private
router.delete('/:categoryId', auth, async (req, res) => {  
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ msg: categoryNotFound });
    }

    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: categoryAuthError });
    }

    await category.remove();
    res.json({ msg: categoryDeleted });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverError);
  }
});

module.exports = router;