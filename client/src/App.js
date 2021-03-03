import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/routes/Routes';
import Alert from './components/UI/Alert';
import { setTokenToHeader } from './utils/functions';
import './App.css';


// Set jwt token stored in local strage to req header
setTokenToHeader(localStorage.token);

const App = () => {
  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Route component={Routes} />
      </Router>
    </Provider>
  );
}

export default App;
