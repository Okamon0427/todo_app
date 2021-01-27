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
import { CONTENT_TYPE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../utils/constants';

const { serverError } = ERROR_MESSAGE;
const { categoryDeleted } = SUCCESS_MESSAGE;

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
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
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
    console.log(err.response)
    dispatch({
      type: ERROR_CATEGORY,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Edit categories
export const updateCategory = editCategory => async dispatch => {
  try {
    const res = await axios.put(
      `/api/categories/${editCategory.categoryId}`,
      editCategory,
      CONTENT_TYPE
    );
  
    dispatch({
      type: EDIT_CATEGORY,
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
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Delete categories
export const deleteCategory = categoryId => async dispatch => {
  try {
    await axios.delete(`/api/categories/${categoryId}`);
  
    dispatch({
      type: DELETE_CATEGORY,
      payload: categoryId
    });
    dispatch(setAlert(categoryDeleted, 'success'));
  } catch (err) {
    dispatch({
      type: ERROR_CATEGORY,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || serverError, "error"));
  }
};

// Clear category
export const clearCategory = () => async dispatch => {
  dispatch({ type: CLEAR_CATEGORY });
};