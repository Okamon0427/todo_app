import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

const dashboard = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
