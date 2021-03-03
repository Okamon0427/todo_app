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
import { DRAWER_WIDTH } from '../../utils/constants';

const landing = () => {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  )
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
      <Route exact path="/" component={landing} />
      <PrivateRoute exact path="/dashboard" component={dashboard} />
      <PrivateRoute exact path="/dashboard/:currentCategoryId" component={dashboard} />
      <PrivateRoute exact path="/user" component={user} />
      <PrivateRoute exact path="/user/image" component={userPicEdit} />
      <PrivateRoute exact path="/password/change" component={passwordChange} />
      <Route component={notFound} />
    </Switch>
  )
}

export default Routes;