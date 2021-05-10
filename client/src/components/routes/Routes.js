import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Layout from '../layout/Layout';
import Landing from '../auth';
import Dashboard from '../dashboard';
import User from '../user';
import UserPicEdit from '../user/UserPicEdit';
import PasswordChange from '../others/PasswordChange';
import Navbar from '../layout/Navbar';
import NotFound from '../others/NotFound';
import { PATH_URL, DRAWER_WIDTH } from '../../utils/constants';

const {
  LANDING,
  DASHBOARD,
  USER,
  USER_IMAGE,
  PASSWORD_CHANGE,
} = PATH_URL;

const landing = () => {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  );
};

const dashboard = () => {
  return (
    <Layout drawerWidth={DRAWER_WIDTH}>
      <Dashboard />
    </Layout>
  );
};

const user = () => {
  return (
    <Layout drawerWidth={DRAWER_WIDTH}>
      <User />
    </Layout>
  );
};

const userPicEdit = () => {
  return (
    <Layout drawerWidth={DRAWER_WIDTH}>
      <UserPicEdit />
    </Layout>
  );
};

const passwordChange = () => {
  return (
    <Layout drawerWidth={DRAWER_WIDTH}>
      <PasswordChange />
    </Layout>
  );
};

const notFound = () => {
  return (
    <>
      <Navbar />
      <NotFound />
    </>
  )
};

const Routes = () => {
  return (
    <Switch>
      <Route exact path={LANDING} component={landing} />
      <PrivateRoute exact path={DASHBOARD} component={dashboard} />
      <PrivateRoute exact path={DASHBOARD + "/:currentCategoryId"} component={dashboard} />
      <PrivateRoute exact path={USER} component={user} />
      <PrivateRoute exact path={USER_IMAGE} component={userPicEdit} />
      <PrivateRoute exact path={PASSWORD_CHANGE} component={passwordChange} />
      <Route component={notFound} />
    </Switch>
  )
}

export default Routes;