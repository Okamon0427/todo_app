const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { VALIDATION_MESSAGE, ERROR_MESSAGE } = require('../utils/constants');
const auth = require('../middleware/auth');
const User = require('../models/User');

const {
  userNameRequired,
  emailValid,
  currentPasswordMinLength,
  newPasswordMinLength
} = VALIDATION_MESSAGE;
const {
  invalidCurrentPassword,
  userExists,
  userNotExists,
  userDeleted,
  serverError,
  emailSent
} = ERROR_MESSAGE;

// <<< Delete Later >>>
// Create user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let currentUser = await User.findOne({ email });
    if (currentUser) {
      return res.status(400).json({ msg: userExists })
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
    res.status(500).send(serverError);
  }
});

// @Route  GET api/user
// @desc   Get user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: userNotExists })
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverError);
  }
});

// @Route  PUT api/user/:userId
// @desc   Update user (NOT Password)
// @access Private
router.put('/:userId', auth,
  [
    check('name', userNameRequired)
      .not()
      .isEmpty(),
    check('email', emailValid).isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: userNotExists })
      }

      const updatedUser = await User.findOneAndUpdate(
        req.user.id,
        req.body,
        { new: true, runValidators: true }
      );

      res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

// @Route  PUT api/user/:userId/password
// @desc   Update user password
// @access Private
router.put('/:userId/password', auth,
  [
    check(
      'currentPassword',
      currentPasswordMinLength
    ).isLength({ min: 6 }),
    check(
      'newPassword',
      newPasswordMinLength
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { currentPassword, newPassword } = req.body;

    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: userNotExists })
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: invalidCurrentPassword });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      
      const updatedUser = await user.save();

      return res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

// @Route  DELETE api/user/:userId
// @desc   Delete user
// @access Private
router.delete('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: userNotExists })
    }

    await user.remove();

    res.json({ msg: userDeleted });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(serverError);
  }
});

// @Route  GET api/user/password/forget
// @desc   Send email to user who forgets password
// @access Public
router.get('/password/forget',
  [
    check('email', emailValid).isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: userNotExists })
      }

      // Write Logic to send email

      res.json({ msg: emailSent });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(serverError);
    }
  }
);

module.exports = router;