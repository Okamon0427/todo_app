const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../utils/constants');
const ExpressError = require('../utils/ExpressError');
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
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
router.post('/',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    let currentUser = await User.findOne({ email });
    if (currentUser) {
      return next(new ExpressError(USER_EXISTS, 400));
    }

    newUserObject = new User({
      name,
      email,
      password
    });

    const newUser = await newUserObject.save();

    res.json(newUser);
  })
);

// @Route  GET api/user
// @desc   Get user
// @access Private
router.get('/', auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ExpressError(USER_NOT_EXISTS, 404));
    }

    res.json(user);
  })
);

// @Route  PUT api/user/:userId
// @desc   Update user (NOT Password)
// @access Private
router.put('/:userId', auth, validation('editInfoUser'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
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
  })
);

// @Route  PUT api/user/:userId/password
// @desc   Update user password
// @access Private
router.put('/:userId/password', auth, validation('editPasswordUser'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
  })
);

// @Route  DELETE api/user/:userId
// @desc   Delete user
// @access Private
router.delete('/:userId', auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ExpressError(USER_NOT_EXISTS, 404));
    }

    await user.remove();

    res.json({ msg: USER_DELETED });
  })
);

// @Route  GET api/user/password/forget
// @desc   Send email to user who forgets password
// @access Public
router.get('/password/forget', validation('forgetPassword'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ExpressError(USER_NOT_EXISTS, 404));
    }

    // Write Logic to send email

    res.json({ msg: EMAIL_SENT });
  })
);

module.exports = router;