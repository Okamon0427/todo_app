import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Signup from './Signup';
import Login from './Login';
import { AUTH_TYPE } from '../../utils/constants';
import { registerAuth, loginAuth } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    boxSizing: 'border-box',
    width: 300,
    padding: 20,
  },
}));

const { SIGNUP, LOGIN } = AUTH_TYPE;

const Landing = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [authType, setAuthType] = useState(LOGIN);

  const onSubmit = (data) => {
    if (authType === LOGIN) {
      dispatch(loginAuth(data));
    } else {
      dispatch(registerAuth(data));
    }
  }

  const changeAuthType = () => {
    if (authType === LOGIN) {
      setAuthType(SIGNUP);
    } else {
      setAuthType(LOGIN);
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
            <Typography variant="h5" align="center">
              {authType === SIGNUP ? SIGNUP : LOGIN}
            </Typography>
            {authType === SIGNUP && (
              <Signup onSubmit={onSubmit} />
            )}
            {authType === LOGIN && (
              <Login onSubmit={onSubmit} />
            )}
            <Button
              color="primary"
              onClick={changeAuthType}
            >
              Change to {authType === SIGNUP ? LOGIN : SIGNUP}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Landing;