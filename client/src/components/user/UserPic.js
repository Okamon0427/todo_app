import React from 'react';
import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  input: {
    display: 'none',
  },
  button: {
    marginTop: theme.spacing(1),
  }
}));

const UserPic = ({ userData }) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      variant="outlined"
      >
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography
            variant="h6"
            className={classes.marginBottom}
          >
            User Page
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            className={classes.large}
            alt={
              userData
              && userData.name
              && userData.name.slice(0, 1)
            }
            src={
              userData
              && userData.avatar
              && userData.avatar.url
            }
          />
        </Grid>
        <Grid>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              className={classes.button}
              size="small"
              color="primary"
              component="span"
            >
              Change
            </Button>
          </label>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default UserPic;