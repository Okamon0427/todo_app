import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import todo from './todo';

export default combineReducers({
  auth,
  user,
  todo
});