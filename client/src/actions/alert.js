import {
  SET_ALERT,
  REMOVE_ALERT
} from './types';

// Set alert
export const setAlert = (msg, type) => async dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, type }
  });
}

// Remove alert
export const removeAlert = () => async dispatch => {
  dispatch({
    type: REMOVE_ALERT,
  });
}