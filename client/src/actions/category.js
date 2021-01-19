import axios from 'axios';
import {
  ADD_CATEGORY,
  GET_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  ERROR_CATEGORY,
  CLEAR_CATEGORY
} from './types';
import { setAlert } from './alert';
import { CONTENT_TYPE } from '../utils/constants';

// Add category
export const addCategory = newCategory => async dispatch => {
  try {
    const res = await axios.post(
      '/api/categories/',
      newCategory,
      CONTENT_TYPE
    );

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_CATEGORY,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg, "error"));
  }
};

// Get categories
export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories');
  
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_CATEGORY,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg, "error"));
  }
};