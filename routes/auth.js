const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const validation = require('../middleware/validation');
const User = require('../models/User');

require('dotenv').config();

const {
  INVALID_CREDENTIALS,
  USER_EXISTS
} = ERROR_MESSAGE;

// @Route  POST api/auth/register
// @desc   Register user
// @access Public
router.post('/register', validation('register'),
  asyncHandler(async (req, res) => {
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
router.post('/login', validation('login'),
  asyncHandler(async (req, res) => {
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