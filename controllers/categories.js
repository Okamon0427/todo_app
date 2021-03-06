const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const Category = require('../models/Category');

const {
  CATEGORY_NOT_FOUND,
  CATEGORY_AUTH_ERROR,
  CATEGORY_EXISTS,
  CATEGORY_DELETED
} = ERROR_MESSAGE;

// @Route  POST api/categories
// @desc   Create category
// @access Private
exports.addCategory = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  const { title } = req.body;

  const allCategories = await Category.find({ user: req.user.id });
  if (allCategories.find(category => category.title === title )) {
    return next(new ExpressError(CATEGORY_EXISTS, 404));
  }

  const newCategoryObject = new Category({
    user: req.user.id,
    title,
  });

  const newCategory = await newCategoryObject.save();

  res.json(newCategory);
});

// @Route  GET api/categories
// @desc   GET all categories by user ID
// @access Private
exports.getCategoriesByUser = asyncHandler(async (req, res, next) => {  
  const allCategories = await Category.find({
    user: req.user.id
  }).sort({ createdAt: -1 });
  res.json(allCategories);
});

// @Route  GET api/categories/:categoryId
// @desc   GET category by category ID
// @access Private
exports.getCategory = asyncHandler(async (req, res, next) => {  
  const categories = await Category.findById(
    req.params.categoryId
  ).sort({ createdAt: -1 });
  res.json(categories);
});

// @Route  PUT api/categories/:categoryId
// @desc   Update category by category ID
// @access Private
exports.editCategory = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  const { title } = req.body;

  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return next(new ExpressError(CATEGORY_NOT_FOUND, 404));
  }

  if (category.user.toString() !== req.user.id) {
    return next(new ExpressError(CATEGORY_AUTH_ERROR, 400));
  }

  const allCategories = await Category.find({ user: req.user.id });
  if (allCategories.find(category => category.title === title )) {
    return next(new ExpressError(CATEGORY_EXISTS, 404));
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    { new: true, runValidators: true },
  );

  res.json(updatedCategory);
});

// @Route  DELETE api/categories/:categoryId
// @desc   Delete category
// @access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return next(new ExpressError(CATEGORY_NOT_FOUND, 404));
  }

  if (category.user.toString() !== req.user.id) {
    return next(new ExpressError(CATEGORY_AUTH_ERROR, 400));
  }

  await category.remove();
  res.json({ msg: CATEGORY_DELETED });
});