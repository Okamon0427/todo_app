const express = require('express');
const router = express.Router();
const User = require('../models/User');

// <<< Delete Later >>>
// Create user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists '})
    }

    user = new User({
      name,
      email,
      password
    });

    const newUser = await user.save();

    res.json(newUser);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;