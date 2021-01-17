import {
  REGISTER_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  USERDATA_AUTH,
  ERROR_AUTH
} from '../actions/types';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: {}
}

const authReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case REGISTER_AUTH:
    case LOGIN_AUTH:
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false
      };
    case USERDATA_AUTH:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case ERROR_AUTH:
    case LOGOUT_AUTH:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload
      };
    default:
      return state
  }
}

export default authReducers;