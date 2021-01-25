import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NOT_FOUND_PAGE } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const {
  title,
  isAuthMessage,
  isNotAuthMessage
} = NOT_FOUND_PAGE; 

const NotFound = () => {
  const classes = useStyles();
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <>
      <h1>{title}</h1>
      <Link to={isAuthenticated ? "/dashboard" : "/"}>
        <Button
          color="primary"
          className={classes.button}
        >
          {isAuthenticated ? isAuthMessage : isNotAuthMessage}
        </Button>
      </Link>
    </>
  )
}

export default NotFound;
