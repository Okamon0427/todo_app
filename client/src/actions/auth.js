import axios from 'axios';
import {
  REGISTER_AUTH,
  LOGIN_AUTH,
  ERROR_AUTH
} from './types';

// Register User
export const registerAuth = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password });
  console.log(body);

  try {
    const res = await axios.post(
      '/api/auth/register',
      body,
      config
    );
    console.log(res);

    localStorage.setItem('token', res.data.token);
  
    dispatch({
      type: REGISTER_AUTH,
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