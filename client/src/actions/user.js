import axios from 'axios';
import {
  GET_USER,
  EDIT_INFO_USER,
  ERROR_USER
} from './types';
import { setAlert } from './alert';
import { CONTENT_TYPE } from '../utils/constants';

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
    dispatch(setAlert(err.response.data.msg, "error"));
  }
};

// Edit user
export const editUser = editUser => async dispatch => {
  try {
    const res = await axios.put(
      `/api/user/${editUser._id}`,
      editUser,
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
    dispatch(setAlert(err.response.data.msg, "error"));
  }
};