import axios from 'axios';
import {
  REGISTER_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  USERDATA_AUTH,
  ERROR_AUTH
} from './types';
import { setAlert } from './alert';
import { clearTodo } from './todo';
import { clearUser } from './user';
import { clearCategory } from './category';
import { CONTENT_TYPE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../utils/constants';
import { setTokenToHeader } from '../utils/functions';

const { serverError } = ERROR_MESSAGE;
const { logout } = SUCCESS_MESSAGE;

// Get login user data
export const userDataAuth = () => async dispatch => {
  setTokenToHeader(localStorage.token);

  try {
    const res = await axios.get('/api/user');

    dispatch({
      type: USERDATA_AUTH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_AUTH,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
}

// Register User
export const registerAuth = ({ name, email, password }) => async dispatch => {
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      '/api/auth/register',
      body,
      CONTENT_TYPE
    );

    localStorage.setItem('token', res.data.token);
  
    dispatch(userDataAuth());
    dispatch({
      type: REGISTER_AUTH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_AUTH,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Login User
export const loginAuth = ({ email, password }) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      '/api/auth/login',
      body,
      CONTENT_TYPE
    );

    localStorage.setItem('token', res.data.token);
  
    dispatch(userDataAuth());
    dispatch({
      type: LOGIN_AUTH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_AUTH,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Logout User
export const logoutAuth = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_AUTH });
  dispatch(clearCategory());
  dispatch(clearTodo());
  dispatch(clearUser());
  dispatch(setAlert(logout, "success"));
};