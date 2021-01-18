import React from 'react';
import { Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const UserPic = ({ userData }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <h1>User Page</h1>
        <Avatar className={classes.large}>
          {userData && userData.name && userData.name.slice(0, 1)}
        </Avatar>
      </Paper>
    </div>
  )
}

export default UserPic;