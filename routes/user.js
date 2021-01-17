const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

// <<< Delete Later >>>
// Create user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let currentUser = await User.findOne({ email });
    if (currentUser) {
      return res.status(400).json({ msg: 'User already exists '})
    }

    newUserObject = new User({
      name,
      email,
      password
    });

    const newUser = await newUserObject.save();

    res.json(newUser);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @Route  GET api/user
// @desc   Get user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User does not exists '})
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route  PUT api/user/:userId
// @desc   Update user (NOT Password)
// @access Private
router.put('/:userId',
  [
    check('name', 'User Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ msg: 'User does not exists '})
      }

      const updatedUser = await User.findOneAndUpdate(
        req.params.userId,
        { new: true }
      );

      res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route  PUT api/user/:userId/password
// @desc   Update user password
// @access Private
router.put('/:userId/password',
  [
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
    
    const { currentPassword, newPassword, newPassword2 } = req.body;

    try {
      let user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ msg: 'User does not exists '})
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Current Password' });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      
      const updatedUser = await user.save();

      return res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route  DELETE api/user/:userId
// @desc   Delete user
// @access Private
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User does not exists '})
    }

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route  GET api/user/password/forget
// @desc   Send email to user who forgets password
// @access Public
router.get('/password/forget',
  [
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'User does not exists '})
      }

      // Write Logic to send email

      res.json({ msg: 'Email sent to your email' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;