import axios from 'axios';
import {
  REGISTER_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  USERDATA_AUTH,
  ERROR_AUTH
} from './types';

// Get login user data
export const userDataAuth = () => async dispatch => {
  if (localStorage.token) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }

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
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
}

// Register User
export const registerAuth = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      '/api/auth/register',
      body,
      config
    );

    localStorage.setItem('token', res.data.token);
  
    dispatch({
      type: REGISTER_AUTH,
      payload: res.data
    });

    dispatch(userDataAuth());
  } catch (err) {
    dispatch({
      type: ERROR_AUTH,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Login User
export const loginAuth = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      '/api/auth/login',
      body,
      config
    );

    localStorage.setItem('token', res.data.token);
  
    dispatch({
      type: LOGIN_AUTH,
      payload: res.data
    });

    dispatch(userDataAuth());
  } catch (err) {
    dispatch({
      type: ERROR_AUTH,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Logout User
export const logoutAuth = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_AUTH });
};