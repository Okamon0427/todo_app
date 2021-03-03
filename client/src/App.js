import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/routes/Routes';
import Landing from './components/auth';
import Layout from './components/layout/Layout';
import Navbar from './components/layout/Navbar';
import Alert from './components/UI/Alert';
import { setTokenToHeader } from './utils/functions';
import { DRAWER_WIDTH } from './utils/constants';
import './App.css';


// Set jwt token stored in local strage to req header
setTokenToHeader(localStorage.token);

const landing = () => {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Switch>
          <Route exact path="/" component={landing} />
          <Layout drawerWidth={DRAWER_WIDTH}>
            <Route component={Routes} />
          </Layout>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
