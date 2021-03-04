const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const { cloudinary } = require('../config/cloudinary');
const User = require('../models/User');

const {
  INVALID_CURRENT_PASSWORD,
  INVALID_ROUTE,
  USER_EXISTS,
  USER_NOT_EXISTS,
  USER_DELETED,
  EMAIL_EXISTS,
  IMAGE_NOT_FOUND,
  TEST_USER
} = ERROR_MESSAGE;

// Create user
exports.addUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  const { name, email, password } = req.body;

  let currentUser = await User.findOne({ email });
  if (currentUser) {
    return next(new ExpressError(USER_EXISTS, 400));
  }

  const newUserObject = new User({
    name,
    email,
    password
  });

  const newUser = await newUserObject.save();
  newUser.password = undefined;

  res.json(newUser);
});

// @Route  GET api/user
// @desc   Get user
// @access Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  res.json(user);
});

// @Route  PUT api/user/:userId
// @desc   Update user (NOT Password)
// @access Private
exports.editInfoUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  if (req.user.id !== req.params.userId) {
    return next(new ExpressError(INVALID_ROUTE, 400));
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  if (user.role === 'test') {
    return next(new ExpressError(TEST_USER, 403));
  }

  const userWithEmail = await User.findOne({ email: req.body.email });
  if (userWithEmail && userWithEmail._id.toString() !== user._id.toString()) {
    return next(new ExpressError(EMAIL_EXISTS, 404));
  }

  const updatedUser = await User.findOneAndUpdate(
    req.user.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');

  res.json(updatedUser);
});

// @Route  PUT api/user/:userId/password
// @desc   Update user password
// @access Private
exports.editPasswordUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }
  
  const { currentPassword, newPassword } = req.body;

  if (req.user.id !== req.params.userId) {
    return next(new ExpressError(INVALID_ROUTE, 400));
  }

  let user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  if (user.role === 'test') {
    return next(new ExpressError(TEST_USER, 403));
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new ExpressError(INVALID_CURRENT_PASSWORD, 400));
  }
  
  user.password = newPassword;
  const updatedUser = await user.save();
  updatedUser.password = undefined;

  return res.json(updatedUser);
});

// @Route  PUT api/user/:userId/image
// @desc   Update user image
// @access Private
exports.editImageUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(new ExpressError(INVALID_ROUTE, 400));
  }

  let user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  if (!req.file) {
    return next(new ExpressError(IMAGE_NOT_FOUND, 400));
  }
  
  // delete current image in cloudinary
  if (user.avatar.length > 0) {
    await cloudinary.uploader.destroy(user.avatar.filename);
  }

  user.avatar.url = req.file.path;
  user.avatar.filename = req.file.filename;
  const updatedUser = await user.save();
  updatedUser.password = undefined;
  
  return res.json(updatedUser);
});

// @Route  DELETE api/user/:userId
// @desc   Delete user
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(new ExpressError(INVALID_ROUTE, 400));
  }
  
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  if (user.role === 'test') {
    return next(new ExpressError(TEST_USER, 403));
  }

  // delete current image in cloudinary
  if (user.avatar.length > 0) {
    await cloudinary.uploader.destroy(user.avatar.filename);
  }

  await user.remove();

  res.json({ msg: USER_DELETED });
});