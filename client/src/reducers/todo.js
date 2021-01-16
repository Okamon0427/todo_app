import {
  ADD_TODO,
} from '../actions/types';

const initialState = {
  todos: [],
  loading: false
}

export default function todoReducers(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.posts, payload],
        loading: false
      }
    default:
      return state
  }
}