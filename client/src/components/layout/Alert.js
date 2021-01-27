import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar }  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { removeAlert } from '../../actions/alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SimpleSnackbar = () => {
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
      >
        {alert && alert.msg}
      </Alert>
    </Snackbar>
  )
}

export default SimpleSnackbar