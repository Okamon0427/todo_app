module.exports.VALIDATION_MESSAGE = {
  USER_REQUIRED: 'User is required',
  USER_NAME_REQUIRED: 'User name is required',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_VALID: 'Email should be a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password should be at least 6 charactars',
  CURRENT_PASSWORD_MIN_LENGTH: 'Current password should be at least 6 charactars',
  NEW_PASSWORD_MIN_LENGTH: 'New password should be at least 6 charactars',
  PASSWORD_MATCH: 'Password is not matched',
  TITLE_REQUIRED: 'Title is required',
  TITLE_CATEGORY_MAX_LENGTH: 'Title should be within 15 charactars',
  TITLE_TODO_MAX_LENGTH: 'Title should be within 50 charactars',
  STATUS_REQUIRED: 'Status is required',
}

module.exports.ERROR_MESSAGE = {
  INVALID_CREDENTIALS: 'Invalid Credentials',
  INVALID_CURRENT_PASSWORD: 'Invalid current password',
  INVALID_ROUTE: 'Invalid route',
  USER_EXISTS: 'This user already exists',
  EMAIL_EXISTS: 'This email is already used',
  USER_NOT_EXISTS: 'This user does not exists',
  USER_DELETED: 'User is deleted',
  CATEGORY_NOT_FOUND: 'Category is not found',
  CATEGORY_AUTH_ERROR: 'This category is not yours',
  CATEGORY_EXISTS: 'This title already exists',
  CATEGORY_DELETED: 'Category is deleted',
  TODO_NOT_FOUND: 'Todo is not found',
  TODO_AUTH_ERROR: 'This todo is not yours',
  TODO_DELETED: 'Todo is deleted',
  SERVER_ERROR: 'Server Error',
  AUTH_ERROR: 'Authorization denied',
  TOKEN_INVALID: 'Token is not valid',
  IMAGE_NOT_FOUND: 'Image is not found',
  TEST_USER: 'Test user cannot change user information'
}