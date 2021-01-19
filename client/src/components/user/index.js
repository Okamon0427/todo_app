import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserPic from './UserPic';
import UserInfo from './UserInfo';
import AccountModal from './AccountModal';
import { getUser, editUserInfo, deleteUser } from '../../actions/user';

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

const User = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [open, setOpen] = useState(false);
  const [editInfo, setEditInfo] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, []);

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
    <>
      <Paper>
        <UserPic userData={user} />
        <UserInfo
          userData={user}
          editInfo={editInfo}
          onEdit={onEdit}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
        <Link to="/password/change">
          <Button
            color="primary"
            className={classes.button}
          >
            Change Password
          </Button>
        </Link>
        <Button
          color="secondary"
          className={classes.button}
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
    </>
  )
}

export default User;