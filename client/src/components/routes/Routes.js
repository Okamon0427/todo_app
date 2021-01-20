import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../dashboard';
import User from '../user';
import PasswordChange from '../others/PasswordChange';
import PasswordReset from '../others/PasswordReset';
import NotFound from '../others/NotFound';

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/dashboard/:currentCategoryId" component={Dashboard} />
      <PrivateRoute exact path="/user" component={User} />
      <PrivateRoute exact path="/password/change" component={PasswordChange} />
      <Route exact path="/password/reset" component={PasswordReset} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routes;