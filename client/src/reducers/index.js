import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import category from './category';
import todo from './todo';
import alert from './alert';

export default combineReducers({
  auth,
  user,
  category,
  todo,
  alert
});