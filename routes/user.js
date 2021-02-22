const express = require('express');
const multer  = require('multer')
const { storage } = require('../config/cloudinary');
const upload = multer({ storage })
const {
  addUser,
  getUser,
  editInfoUser,
  editPasswordUser,
  editImageUser,
  deleteUser,
  forgetPassword
} = require('../controllers/user');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

const router = express.Router();

router.post('/', auth, validation('addUser'), addUser);
router.get('/', auth, getUser);
router.put('/:userId', auth, validation('editInfoUser'), editInfoUser);
router.put('/:userId/password', auth, validation('editPasswordUser'), editPasswordUser);
router.put('/:userId/image', upload.single('avatar'), auth, editImageUser);
router.delete('/:userId', auth, deleteUser);
router.get('/password/forget', validation('forgetPassword'), forgetPassword);

module.exports = router;