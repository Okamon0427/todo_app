const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const sendJWTToken = require('../utils/sendJWTToken');
const User = require('../models/User');

require('dotenv').config();

const {
  INVALID_CREDENTIALS,
  USER_EXISTS
} = ERROR_MESSAGE;

// @Route  POST api/auth/register
// @desc   Register user
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(new ExpressError(USER_EXISTS, 400));
  }

  const newUserObject = new User({
    name,
    email,
    password
  });
  
  const newUser = await newUserObject.save();

  sendJWTToken(newUser, res);
});

// @Route  POST api/auth/login
// @desc   Authenticate user
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ExpressError(errors.array()[0].msg, 400));
  }

  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return next(new ExpressError(INVALID_CREDENTIALS, 400));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ExpressError(INVALID_CREDENTIALS, 400));
  }

  sendJWTToken(user, res);
});