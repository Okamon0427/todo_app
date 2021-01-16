import axios from 'axios';
import {
  ADD_TODO,
  GET_TODOS,
  ERROR_TODO
} from './types';

// Add todo
export const addTodo = (data) => async dispatch => {
  console.log(data);
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