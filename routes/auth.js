const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @Route  POST api/auth/register
// @desc   Register user
// @access Public
router.post(
  '/register',
  [
    check('name', 'User Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists '})
      }
  
      user = new User({
        name,
        email,
        password
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();

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
      res.status(500).send('Server error');
    }
  }
);

// @Route  POST api/auth/login
// @desc   Authenticate user
// @access Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please is required'
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
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
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
      res.status(500).send('Server error');
    }
  }
);

// @Route  GET api/auth/logout
// @desc   User log out
// @access Private
router.post('/logout', async (req, res) => {

});

module.exports = router;