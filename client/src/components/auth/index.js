import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Signup from './Signup';
import Login from './Login';
import { AUTH_TYPE } from '../../utils/constants';
import { registerAuth, loginAuth } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 300,
    padding: 20,
  },
}));

const { signup, login } = AUTH_TYPE;

const Landing = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [authType, setAuthType] = useState(login);

  const onSubmit = (data) => {
    if (authType === login) {
      dispatch(loginAuth(data));
    } else {
      dispatch(registerAuth(data));
    }
  }

  const changeAuthType = () => {
    if (authType === login) {
      setAuthType(signup);
    } else {
      setAuthType(login);
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Box mt={10}>
      <Grid container justify="center">
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              {authType === signup ? signup : login}
            </Typography>
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
            {authType === login && (
              <Button
                color="primary"
                component={Link}
                to="/password/reset"
              >
                Forget Password?
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Landing;