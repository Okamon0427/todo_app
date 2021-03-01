import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getUser } from '../../actions/user';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 300,
    padding: 20,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  }
}));

const UserPicEdit = ({ userData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Grid container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h6"
                className={classes.marginBottom}
              >
                Update Avatar
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                className={classes.large}
                alt={
                  userData
                  && userData.name
                  && userData.name.slice(0, 1)
                }
              />
            </Grid>
            <Grid>
              <Button
                className={classes.button}
                size="small"
                color="primary"
              >
                Choose Image
              </Button>
              <Button
                className={classes.button}
                size="small"
                color="primary"
              >
                Submit
              </Button>
              <Button
                className={classes.button}
                size="small"
                component={Link}
                to="/user"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserPicEdit;