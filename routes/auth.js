const express = require('express');
const {
  register,
  login
} = require('../controllers/auth');
const validation = require('../middleware/validation');

const router = express.Router();

router.post('/register', validation('register'), register);
router.post('/login', validation('login'), login);

module.exports = router;