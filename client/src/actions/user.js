import axios from 'axios';
import {
  GET_USER,
  EDIT_INFO_USER,
  EDIT_PASSWORD_USER,
  ERROR_USER,
  CLEAR_USER
} from './types';
import { setAlert } from './alert';
import { CONTENT_TYPE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../utils/constants';
import { logoutAuth } from './auth';

const { serverError } = ERROR_MESSAGE;
const { passwordChanged } = SUCCESS_MESSAGE;

// Get user
export const getUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/user');
  
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_USER,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Edit user
export const editUserInfo = editUser => async dispatch => {
  try {
    const body = JSON.stringify({ ...editUser });

    const res = await axios.put(
      `/api/user/${editUser.id}`,
      body,
      CONTENT_TYPE
    );

    dispatch({
      type: EDIT_INFO_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_USER,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Edit password
export const editUserPassword = editUser => async dispatch => {
  try {
    const body = JSON.stringify({ ...editUser });

    const res = await axios.put(
      `/api/user/${editUser.id}/password`,
      body,
      CONTENT_TYPE
    );

    dispatch({
      type: EDIT_PASSWORD_USER,
      payload: res.data
    });
    dispatch(setAlert(passwordChanged, "success"));
  } catch (err) {
    dispatch({
      type: ERROR_USER,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Delete User
export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/user/${id}`);

    dispatch(logoutAuth());
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    dispatch({
      type: ERROR_USER,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Clear User
export const clearUser = () => async dispatch => {
  dispatch({ type: CLEAR_USER });
};