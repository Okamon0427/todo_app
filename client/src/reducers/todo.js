import {
  ADD_TODO,
  GET_TODOS,
  GET_TODOS_BY_CATEGORY,
  EDIT_TODO,
  DELETE_TODO,
  ERROR_TODO,
  CLEAR_TODO
} from '../actions/types';

const initialState = {
  todos: [],
  loading: true,
  error: null
}

const todoReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
        error: null
      };
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
        error: null
      };
    case GET_TODOS_BY_CATEGORY:
      return {
        ...state,
        todos: state.todos.filter(todo => {
          return todo.category === payload
        }),
        loading: false,
        error: null
      }
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
        loading: false,
        error: null
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => {
          return todo._id !== payload
        }),
        loading: false,
        error: null
      };
    case ERROR_TODO:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CLEAR_TODO:
      return {
        ...state,
        todos: [],
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export default todoReducers;