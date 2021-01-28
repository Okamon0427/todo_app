import React from 'react';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const UserPic = ({ userData }) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      variant="outlined"
    >
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography
            variant="h5"
            className={classes.marginBottom}
          >
            User Page
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.large}>
            {userData && userData.name && userData.name.slice(0, 1)}
          </Avatar>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default UserPic;