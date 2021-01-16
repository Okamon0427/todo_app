import {
  ADD_TODO,
  GET_TODOS,
  ERROR_TODO
} from '../actions/types';

const initialState = {
  todos: [],
  loading: true,
  error: {}
}

const todoReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false
      };
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false
      };
    case ERROR_TODO:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state
  }
}

export default todoReducers;