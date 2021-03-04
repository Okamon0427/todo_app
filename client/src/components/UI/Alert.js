import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar }  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { removeAlert } from '../../actions/alert';

const useStyles = makeStyles((theme) => ({
  alert: {
    backgroundColor: 'rgb(255, 255, 255)',
  }
}));

function Alert(props) {
  return (
    <MuiAlert
      elevation={6}
      variant="outlined"
      {...props}
    />
  );
}

const SimpleSnackbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { alert, isOpen } = useSelector(state => state.alert);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(removeAlert());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alert ? alert.type : "success"}
        className={classes.alert}
      >
        {alert && alert.msg}
      </Alert>
    </Snackbar>
  )
}

export default SimpleSnackbar