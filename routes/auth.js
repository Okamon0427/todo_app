const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

require('dotenv').config();

const {
  userNameRequired,
  emailValid,
  passwordRequired,
  passwordMinLength,
} = VALIDATION_MESSAGE;
const {
  invalidCredentials,
  userExists,
} = ERROR_MESSAGE;

// @Route  POST api/auth/register
// @desc   Register user
// @access Public
router.post('/register',
  [
    check('name', userNameRequired)
      .not()
      .isEmpty(),
    check('email', emailValid).isEmail(),
    check(
      'password',
      passwordMinLength
    ).isLength({ min: 6 })
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return next(new ExpressError(userExists, 400));
    }

    const newUserObject = new User({
      name,
      email,
      password
    });
    
    const newUser = await newUserObject.save();

    const payload = {
      user: {
        id: newUser.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  })
);

// @Route  POST api/auth/login
// @desc   Authenticate user
// @access Public
router.post('/login',
  [
    check('email', emailValid).isEmail(),
    check(
      'password',
      passwordRequired
    ).exists()
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return next(new ExpressError(invalidCredentials, 400));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ExpressError(invalidCredentials, 400));
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  })
);

module.exports = router;