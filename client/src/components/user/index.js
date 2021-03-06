import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserPic from './UserPic';
import UserInfo from './UserInfo';
import Modal from '../UI/Modal';
import { getUser, editUserInfo, deleteUser } from '../../actions/user';
import { PATH_URL } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 300,
    padding: 20,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const User = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [open, setOpen] = useState(false);
  const [editInfo, setEditInfo] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEdit = (key) => {
    setEditInfo(key);
  }

  const onCancel = () => {
    setEditInfo(null);
  }

  const onSubmit = (data) => {
    let convertedData = {
      ...data,
      id: user._id
    }

    if (editInfo === 'name') {
      convertedData.email = user.email;
    } else if (editInfo === 'email') {
      convertedData.name = user.name
    }
    
    dispatch(editUserInfo(convertedData));
    setEditInfo(null);
  }

  const onDelete = () => {
    dispatch(deleteUser(user._id))
      .then(() => {
        history.push(PATH_URL.LANDING);
      })
      .catch(() => {});
  }

  return (
    <Grid container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          <UserPic
            userData={user}
          />
          <UserInfo
            userData={user}
            editInfo={editInfo}
            onEdit={onEdit}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
          <Button
            color="primary"
            component={Link}
            to={PATH_URL.PASSWORD_CHANGE}
          >
            Change Password
          </Button>
          <Button
            component={Link}
            to={PATH_URL.DASHBOARD}
          >
            Go Back
          </Button>
          <Button
            color="secondary"
            onClick={handleOpen}
          >
            Delete Account
          </Button>
        </Paper>
        <Modal
          open={open}
          handleClose={handleClose}
          onDelete={onDelete}
        />
      </Grid>
    </Grid>
  )
}

export default User;