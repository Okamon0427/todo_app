export const AUTH_TYPE = {
  SIGNUP: 'Sign Up',
  LOGIN: 'Login'
}

export const CONTENT_TYPE = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const ERROR_MESSAGE = {
  USER_NAME_REQUIRED: 'User name is required',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_VALID: 'Email should be a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password should be at least 6 charactars',
  PASSWORD_MATCH: 'Password is not matched',
  TITLE_REQUIRED: 'Title is required',
  TITLE_CATEGORY_MAX_LENGTH: 'Title should be within 15 charactars',
  TITLE_TODO_MAX_LENGTH: 'Title should be within 50 charactars',
  STATUS_REQUIRED: 'Status is required',
  SERVER_ERROR: 'Server error. Please try it again.'
}

export const SUCCESS_MESSAGE = {
  PASSWORD_CHANGED: 'Passward is changed',
  CATEGORY_DELETED: 'Category is deleted',
  TODO_DELETED: 'Todo is deleted',
  LOGOUT: 'You logged out'
}

export const REGEX = {
  //eslint-disable-next-line
  EMAIL_REGEX: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
}

export const DATE_FORMAT = {
  numberDate: 'MM/DD/YYYY, hh:mm a',
  wordDate: 'MMMM Do YYYY, hh:mm a'
};

export const DRAWER_WIDTH = 280;