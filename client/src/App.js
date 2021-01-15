import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Landing from './components/auth';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard';
import User from './components/user';
import './App.css';

const landing = () => {
  return (
    <Layout>
      <Landing />
    </Layout>
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

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={landing} />
        <Route exact path="/dashboard" component={dashboard} />
        <Route exact path="/dashboard/:categoryId" component={dashboard} />
        <Route exact path="/user" component={user} />
      </Switch>
    </Router>
  );
}

export default App;
