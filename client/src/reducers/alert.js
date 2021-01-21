import {
  SET_ALERT,
  REMOVE_ALERT
} from '../actions/types';

const initialState = {
  alert: null,
  isOpen: false
}

const authReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
        isOpen: true
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null,
        isOpen: false
      };
    default:
      return state
  }
}

export default authReducers;