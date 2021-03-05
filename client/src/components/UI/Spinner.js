import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  spinner: {
    margin: '200px auto'
  }
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress className={classes.spinner} />
    </div>
  );
}

export default Spinner; 