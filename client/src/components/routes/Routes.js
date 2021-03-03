import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../dashboard';
import User from '../user';
import UserPicEdit from '../user/UserPicEdit';
import PasswordChange from '../others/PasswordChange';
import NotFound from '../others/NotFound';

const Routes = () => {
  return (
    <>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/dashboard/:currentCategoryId" component={Dashboard} />
      <PrivateRoute exact path="/user" component={User} />
      <PrivateRoute exact path="/user/image" component={UserPicEdit} />
      <PrivateRoute exact path="/password/change" component={PasswordChange} />
      <PrivateRoute component={NotFound} />
    </>
  )
}
export default Routes;