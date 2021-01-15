import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Paper } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import Signup from './Signup';
import Login from './Login';
import { AUTH_TYPE } from '../../utils/constants';

// const useStyles = makeStyles((theme) => ({}));

const { signup, login } = AUTH_TYPE;

const Landing = () => {
  // const classes = useStyles();
  const history = useHistory();

  const [authType, setAuthType] = useState(login);

  const onSubmit = (data) => {
    console.log(data)
    history.push('/dashboard');
  }

  const changeAuthType = () => {
    if (authType === login) {
      setAuthType(signup);
    } else {
      setAuthType(login);
    }
  }

  return (
    <Paper>
      <h1>
        {authType === signup ? signup : login}
      </h1>
      {authType === signup && (
        <Signup onSubmit={onSubmit} />
      )}
      {authType === login && (
        <Login onSubmit={onSubmit} />
      )}
      <Button
        color="primary"
        onClick={changeAuthType}
      >
        Change to {authType === signup ? login : signup}
      </Button>
    </Paper>
  );
}

export default Landing;