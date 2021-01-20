import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/auth';
import Layout from './components/layout/Layout';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard';
import User from './components/user';
import PasswordChange from './components/others/PasswordChange';
import PasswordReset from './components/others/PasswordReset';
import NotFound from './components/others/NotFound';
import './App.css';

// Check Later
import { setTokenToHeader } from './utils/functions';
setTokenToHeader(localStorage.token);

const landing = () => {
  return (
    <Landing />
  );
}

const dashboard = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

const user = () => {
  return (
    <Layout>
      <User />
    </Layout>
  );
}

const passwordChange = () => {
  return (
    <Layout>
      <PasswordChange />
    </Layout>
  );
}

const passwordReset = () => {
  return (
    <Layout>
      <PasswordReset />
    </Layout>
  );
}

const notFound = () => {
  return (
    <Layout>
      <NotFound />
    </Layout>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={landing} />
          <Route exact path="/dashboard" component={dashboard} />
          <Route exact path="/dashboard/:currentCategoryId" component={dashboard} />
          <Route exact path="/user" component={user} />
          <Route exact path="/password/change" component={passwordChange} />
          <Route exact path="/password/reset" component={passwordReset} />
          <Route component={notFound} />
        </Switch>
      </Router>
      <Alert />
    </Provider>
  );
}

export default App;
