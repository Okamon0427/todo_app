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
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category._id === payload._id) {
            return payload;
          } else {
            return category;
          }
        }),
        loading: false,
        error: null
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => {
          return category._id !== payload
        }),
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
        categories: [],
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export default categoryReducers;