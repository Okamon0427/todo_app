import axios from 'axios';
import {
  ADD_TODO,
  GET_TODOS,
  GET_TODOS_BY_CATEGORY,
  EDIT_TODO,
  DELETE_TODO,
  ERROR_TODO,
  CLEAR_TODO
} from './types';
import { setAlert } from './alert';
import { CONTENT_TYPE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../utils/constants';

const { SERVER_ERROR } = ERROR_MESSAGE;
const { TODO_DELETED } = SUCCESS_MESSAGE;

// Add todo
export const addTodo = newTodo => async dispatch => {
  try {
    const res = await axios.post(
      '/api/todos/',
      newTodo,
      CONTENT_TYPE
    );

    dispatch({
      type: ADD_TODO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_TODO,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Get todos
export const getTodos = () => async dispatch => {
  try {
    const res = await axios.get('/api/todos');
  
    dispatch({
      type: GET_TODOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_TODO,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Get todos by category
export const getTodosByCategory = categoryId => async dispatch => {
  try {
    const res = await axios.get(`/api/todos/${categoryId}`);

    dispatch({
      type: GET_TODOS_BY_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_TODO,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }

};

// Edit todo
export const editTodo = editTodo => async dispatch => {
  try {
    const res = await axios.put(
      `/api/todos/${editTodo.id}`,
      editTodo,
      CONTENT_TYPE
    );

    dispatch({
      type: EDIT_TODO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_TODO,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Delete todo
export const deleteTodo = id => async dispatch => {
  try {
    await axios.delete(`/api/todos/${id}`);

    dispatch({
      type: DELETE_TODO,
      payload: id
    });
    dispatch(setAlert(TODO_DELETED, 'success'))
  } catch (err) {
    dispatch({
      type: ERROR_TODO,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
    dispatch(setAlert(err.response.data.msg || SERVER_ERROR, "error"));
  }
};

// Clear todo
export const clearTodo = () => async dispatch => {
  dispatch({ type: CLEAR_TODO });
};