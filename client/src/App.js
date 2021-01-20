import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/routes/Routes';
import Landing from './components/auth';
import Layout from './components/layout/Layout';
import Alert from './components/layout/Alert';
import './App.css';

// Check Later
import { setTokenToHeader } from './utils/functions';
setTokenToHeader(localStorage.token);

const App = () => {
  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Layout>
            <Route component={Routes} />
          </Layout>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
