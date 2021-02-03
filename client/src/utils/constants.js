export const AUTH_TYPE = {
  signup: 'Sign Up',
  login: 'Login'
}

export const CONTENT_TYPE = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const ERROR_MESSAGE = {
  userNameRequired: 'User name is required',
  emailRequired: 'Email is required',
  emailValid: 'Email should be a valid email address',
  passwordRequired: 'Password is required',
  passwordMinLength: 'Password should be at least 6 charactars',
  passwordMatch: 'Password is not matched',
  titleRequired: 'Title is required',
  titleCategoryMaxLength: 'Title should be within 15 charactars',
  titleTodoMaxLength: 'Title should be within 50 charactars',
  statusRequired: 'Status is required',
  serverError: 'Server error. Please try it again.'
}

export const SUCCESS_MESSAGE = {
  passwordChanged: 'Passward is changed',
  categoryDeleted: 'Category is deleted',
  todoDeleted: 'Todo is deleted',
  logout: 'You logged out'
}

export const REGEX = {
  //eslint-disable-next-line
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
}

export const DATE_FORMAT = {
  numberDate: 'MM/DD/YYYY, hh:mm a',
  wordDate: 'MMMM Do YYYY, hh:mm a'
};

export const STATUS_ARRAY = [
  {
    key: 0,
    value: 'Not Started',
  },
  {
    key: 1,
    value: 'In Progress',
  },
  {
    key: 2,
    value: 'Done',
  },
];

export const NOT_FOUND_PAGE = {
  title: 'Page Not Found',
  isAuthMessage: 'Move to dashboard page',
  isNotAuthMessage: 'Move to login Page'
}

export const DRAWER_WIDTH = 280;