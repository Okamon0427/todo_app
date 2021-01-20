const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');
const User = require('../models/User');

const {
  userNameRequired,
  emailValid,
  passwordRequired,
  passwordMinLength,
} = VALIDATION_MESSAGE;
const {
  invalidCredentials,
  userExists,
  serverError
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({
          msg: userExists
        })
      }
  
      const newUserObject = new User({
        name,
        email,
        password
      });
  
      const salt = await bcrypt.genSalt(10);
      newUserObject.password = await bcrypt.hash(password, salt);
      
      const newUser = await newUserObject.save();

      const payload = {
        user: {
          id: newUser.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch(err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: invalidCredentials });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: invalidCredentials });
      }
  
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch(err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

module.exports = router;