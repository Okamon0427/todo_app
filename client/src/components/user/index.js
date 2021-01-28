import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserPic from './UserPic';
import UserInfo from './UserInfo';
import AccountModal from './AccountModal';
import { getUser, editUserInfo, deleteUser } from '../../actions/user';

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
    } else {
      convertedData.name = user.name
    }
    dispatch(editUserInfo(convertedData));
    setEditInfo(null);
  }

  const onDelete = () => {
    dispatch(deleteUser(user._id));
    history.push('/');
  }

  return (
    <Grid container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          <UserPic userData={user} />
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
            to="/password/change"
          >
            Change Password
          </Button>
          <Button
            color="secondary"
            onClick={handleOpen}
          >
            Delete Account
          </Button>
        </Paper>
        <AccountModal
          open={open}
          handleClose={handleClose}
          onDelete={onDelete}
        />
      </Grid>
    </Grid>
  )
}

export default User;