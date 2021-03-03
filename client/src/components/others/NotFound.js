import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  margin: {
    marginTop: '100px',
    marginLeft: '16px'
  }
}));

const NotFound = () => {
  const classes = useStyles();
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <>
      <Typography className={classes.margin} variant="h4">
        Page Not Found
      </Typography>
      <Link to={isAuthenticated ? "/dashboard" : "/"}>
        <Button
          color="primary"
          className={classes.button}
        >
          {isAuthenticated ? 'Move to dashboard page' : 'Move to login Page'}
        </Button>
      </Link>
    </>
  )
}

export default NotFound;
