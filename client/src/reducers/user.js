import {
  GET_USER,
  EDIT_INFO_USER,
  EDIT_PASSWORD_USER,
  EDIT_IMAGE_UPLOADING,
  EDIT_IMAGE_UPLOADED,
  ERROR_USER,
  CLEAR_USER
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
    case EDIT_INFO_USER:
    case EDIT_PASSWORD_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null
      };
    case EDIT_IMAGE_UPLOADING:
      return {
        ...state,
        loading: true
      };
    case EDIT_IMAGE_UPLOADED:
      return {
        ...state,
        loading: false
      };
    case ERROR_USER:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CLEAR_USER:
      return {
        ...state,
        user: [],
        loading: false,
        error: null
      };
    default:
      return state
  }
}

export default userReducers;