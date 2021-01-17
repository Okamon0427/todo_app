import axios from 'axios';
import {
  GET_USER,
  ERROR_USER
} from './types';

// Get todos
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