import axios from 'axios';
import {
  ADD_TODO,
  GET_TODOS,
  EDIT_TODO,
  DELETE_TODO,
  ERROR_TODO
} from './types';
import { CONTENT_TYPE } from '../utils/constants';

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
  } catch (err) {
    dispatch({
      type: ERROR_TODO,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};