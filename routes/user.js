const express = require('express');
const {
  addUser,
  getUser,
  editInfoUser,
  editPasswordUser,
  deleteUser,
  forgetPassword
} = require('../controllers/user');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const router = express.Router();

router.post('/', addUser); // delete later
router.get('/', auth, getUser);
router.put('/:userId', auth, validation('editInfoUser'), editInfoUser);
router.put('/:userId/password', auth, validation('editPasswordUser'), editPasswordUser);
router.delete('/:userId', auth, deleteUser);
router.get('/password/forget', validation('forgetPassword'), forgetPassword);

module.exports = router;