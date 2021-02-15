const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const {
  INVALID_CURRENT_PASSWORD,
  USER_EXISTS,
  USER_NOT_EXISTS,
  USER_DELETED,
  EMAIL_SENT
} = ERROR_MESSAGE;

// <<< Delete Later >>>
// Create user
exports.addUser = asyncHandler(async (req, res, next) => {
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

  res.json(newUser);
});

// @Route  GET api/user
// @desc   Get user
// @access Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
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

  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  const updatedUser = await User.findOneAndUpdate(
    req.user.id,
    req.body,
    { new: true, runValidators: true }
  );

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

  let user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new ExpressError(INVALID_CURRENT_PASSWORD, 400));
  }
  
  const updatedUser = await user.save();

  return res.json(updatedUser);
});

// @Route  DELETE api/user/:userId
// @desc   Delete user
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  await user.remove();

  res.json({ msg: USER_DELETED });
});

// @Route  GET api/user/password/forget
// @desc   Send email to user who forgets password
// @access Public
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  // Write Logic to send email

  res.json({ msg: EMAIL_SENT });
});