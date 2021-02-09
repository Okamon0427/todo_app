const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const Category = require('../models/Category');

const {
  titleRequired,
  titleCategoryMaxLength
} = VALIDATION_MESSAGE;
const {
  categoryNotFound,
  categoryAuthError,
  categoryExists,
  categoryDeleted,
} = ERROR_MESSAGE;

// @Route  POST api/categories
// @desc   Create category
// @access Private
router.post('/', auth,
  [
    check('title', titleRequired)
      .not()
      .isEmpty(),
    check('title', titleCategoryMaxLength)
      .isLength({ max: 15 })
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;

    const existTitle = await Category.find({ title, user: req.user.id });
    if (existTitle && existTitle.length > 0) {
      return next(new ExpressError(categoryExists, 401));
    }

    const newCategoryObject = new Category({
      user: req.user.id,
      title,
    });

    const newCategory = await newCategoryObject.save();

    res.json(newCategory);
  })
);

// @Route  GET api/categories
// @desc   GET all categories by user ID
// @access Private
router.get('/', auth,
  asyncHandler(async (req, res) => {  
    const allCategories = await Category.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(allCategories);
  })
);

// @Route  GET api/categories/:categoryId
// @desc   GET category by category ID
// @access Private
router.get('/:categoryId', asyncHandler(async (req, res) => {  
  const categories = await Category.findById(
    req.params.categoryId
  )
    .sort({ createdAt: -1 });
  res.json(categories);
}));

// @Route  PUT api/categories/:categoryId
// @desc   Update category by category ID
// @access Private
router.put('/:categoryId', auth,
  [
    check('title', titleRequired)
      .not()
      .isEmpty(),
    check('title', titleCategoryMaxLength)
      .isLength({ max: 15 })
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;

    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return next(new ExpressError(categoryNotFound, 404));
    }

    if (category.user.toString() !== req.user.id) {
      return next(new ExpressError(categoryAuthError, 401));
    }

    const existTitle = await Category.find({ title, user: req.user.id });
    if (existTitle && existTitle.length > 0) {
      return next(new ExpressError(categoryExists, 401));
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true, runValidators: true },
    );

    res.json(updatedCategory);
  })
);

// @Route  DELETE api/categories/:categoryId
// @desc   Delete category
// @access Private
router.delete('/:categoryId', auth, asyncHandler(async (req, res) => {  
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return next(new ExpressError(categoryNotFound, 404));
  }

  if (category.user.toString() !== req.user.id) {
    return next(new ExpressError(categoryAuthError, 401));
  }

  await category.remove();
  res.json({ msg: categoryDeleted });
}));

module.exports = router;