import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <>
      <h1>Page Not Found</h1>
      <Link to="/dashboard">
        <Button
          color="primary"
          className={classes.button}
        >
          Move to dashboard page
        </Button>
      </Link>
    </>
  )
}

export default NotFound;
