import {
  GET_USER,
  EDIT_INFO_USER,
  ERROR_USER
} from '../actions/types';

const initialState = {
  user: [],
  loading: true,
  error: null
}

const userReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null
      };
    case EDIT_INFO_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null
      };
    case ERROR_USER:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state
  }
}

export default userReducers;