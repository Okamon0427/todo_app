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
  EMAIL_EXISTS,
  EMAIL_SENT
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

  let user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
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
  // validation

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(new ExpressError(errors.array()[0].msg, 400));
  // }

  // search exists user
  let user = await User.findById(req.user.id);
  if (!user) {
    return next(new ExpressError(USER_NOT_EXISTS, 404));
  }

  // receive req.file
  if (!req.file) {
    return next(new ExpressError('Hello')); // set up constant
  }
  const { path } = req.file;

  // update new image in model
  user.avatar = path;
  const updatedUser = await user.save();

  // delete current image in cloudinary

  // update new image in cloudinary

  // response json data
  return res.json(updatedUser); // return filepath to cloudinary
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