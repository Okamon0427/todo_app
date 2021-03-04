import axios from 'axios';
import {
  GET_USER,
  EDIT_INFO_USER,
  EDIT_PASSWORD_USER,
  ERROR_USER,
  CLEAR_USER
} from './types';
import { setAlert } from './alert';
import { PATH_API, CONTENT_TYPE, CONTENT_TYPE_IMAGE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../utils/constants';
import { logoutAuth } from './auth';

const { SERVER_ERROR } = ERROR_MESSAGE;
const { PASSWORD_CHANGED, IMAGE_UPLOADED } = SUCCESS_MESSAGE;

// Get user
export const getUser = () => async dispatch => {
  try {
    const res = await axios.get(PATH_API.USER);
  
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
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Edit user
export const editUserInfo = editUser => async dispatch => {
  try {
    const body = JSON.stringify({ ...editUser });

    const res = await axios.put(
      PATH_API.USER + `/${editUser.id}`,
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
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Edit password
export const editUserPassword = editUser => async dispatch => {
  try {
    const body = JSON.stringify({ ...editUser });

    const res = await axios.put(
      PATH_API.USER + `/${editUser.id}/password`,
      body,
      CONTENT_TYPE
    );

    dispatch({
      type: EDIT_PASSWORD_USER,
      payload: res.data
    });
    dispatch(setAlert(PASSWORD_CHANGED, "success"));
  } catch (err) {
    dispatch({
      type: ERROR_USER,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Edit Avatar
export const editUserImage = (formData, userId) => async dispatch => {
  try {
    await axios.put(
      PATH_API.USER + `/${userId}/image`,
      formData,
      CONTENT_TYPE_IMAGE
    );

    dispatch(setAlert(IMAGE_UPLOADED, "success"));
  } catch (err) {
    dispatch({
      type: ERROR_USER,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Delete User
export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(PATH_API.USER + `/${id}`);

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
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Clear User
export const clearUser = () => async dispatch => {
  dispatch({ type: CLEAR_USER });
};