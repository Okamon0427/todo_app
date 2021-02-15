const { check } = require('express-validator');
const { VALIDATION_MESSAGE } = require('../utils/constants');

const {
  USER_NAME_REQUIRED,
  EMAIL_VALID,
  PASSWORD_REQUIRED,
  PASSWORD_MIN_LENGTH,
  CURRENT_PASSWORD_MIN_LENGTH,
  NEW_PASSWORD_MIN_LENGTH,
  TITLE_CATEGORY_MAX_LENGTH,
  TITLE_REQUIRED,
  TITLE_TODO_MAX_LENGTH
} = VALIDATION_MESSAGE;

module.exports = function(method) {
  switch (method) {
    case 'register':
    case 'addUser':
      return [
        check('name', USER_NAME_REQUIRED)
          .not()
          .isEmpty(),
        check('email', EMAIL_VALID)
          .isEmail(),
        check('password', PASSWORD_MIN_LENGTH)
          .isLength({ min: 6 })
      ];
    case 'login':
      return [
        check('email', EMAIL_VALID)
          .isEmail(),
        check('password', PASSWORD_REQUIRED)
          .exists()
      ];
    case 'editInfoUser':
      return [
        check('name', USER_NAME_REQUIRED)
          .not()
          .isEmpty(),
        check('email', EMAIL_VALID)
          .isEmail(),
      ];
    case 'editPasswordUser':
      return [
        check('currentPassword', CURRENT_PASSWORD_MIN_LENGTH)
          .isLength({ min: 6 }),
        check('newPassword', NEW_PASSWORD_MIN_LENGTH)
          .isLength({ min: 6 })
      ];
    case 'forgetPassword':
      return [
        check('email', EMAIL_VALID)
          .isEmail(),
      ];
    case 'addTodo':
    case 'editTodo':
      return [ 
        check('title', TITLE_REQUIRED)
          .not()
          .isEmpty(),
        check('title', TITLE_TODO_MAX_LENGTH)
          .isLength({ max: 50 }),
      ];
    case 'addCategory':
    case 'editCategory':
      return [
        check('title', TITLE_REQUIRED)
          .not()
          .isEmpty(),
        check('title', TITLE_CATEGORY_MAX_LENGTH)
          .isLength({ max: 15 })
      ];
  }
}