export const AUTH_TYPE = {
  signup: 'Sign Up',
  login: 'Login'
}

export const ERROR_MESSAGE = {
  userNameRequired: "User name is required",
  emailRequired: "Email is required",
  emailValid: "Email should be a valid email address",
  passwordRequired: "Password is required",
  passwordMinLength: "Password should be at least 6 charactars",
  passwordMatch: "Password is not matched"
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