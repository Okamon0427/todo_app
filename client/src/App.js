import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/routes/Routes';
import Landing from './components/auth';
import PasswordReset from './components/others/PasswordReset';
import Layout from './components/layout/Layout';
import Alert from './components/layout/Alert';
import { setTokenToHeader } from './utils/functions';
import './App.css';

// Set jwt token stored in local strage to req header
setTokenToHeader(localStorage.token);

const App = () => {

  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/password/reset" component={PasswordReset} />
          <Layout>
            <Route component={Routes} />
          </Layout>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
