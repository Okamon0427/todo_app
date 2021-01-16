import {
  ADD_TODO,
  GET_TODOS,
  EDIT_TODO,
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
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === payload._id) {
            return payload;
          } else {
            return todo;
          }
        }),
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