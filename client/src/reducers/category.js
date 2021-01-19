import {
  ADD_CATEGORY,
  GET_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  ERROR_CATEGORY,
  CLEAR_CATEGORY
} from '../actions/types';

const initialState = {
  categories: [],
  loading: true,
  error: null
}

const categoryReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: [...payload],
        loading: false,
        error: null
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
        loading: false,
        error: null
      };
    case ERROR_CATEGORY:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CLEAR_CATEGORY:
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

export default categoryReducers;