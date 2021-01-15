import React from 'react';
import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AccountModal = ({ open, handleClose, onDelete }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Do you really want to delete this account?</h2>
          <p id="transition-modal-description">This action cannot be undone</p>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={onDelete}
          >
            Delete Account
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleClose}
          >
            Go Back
          </Button>
        </div>
      </Fade>
    </Modal>
  )
}

export default AccountModal;