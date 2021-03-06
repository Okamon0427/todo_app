import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PATH_URL, ERROR_MESSAGE } from '../../utils/constants';
import { editUserPassword } from '../../actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    width: 300,
    padding: 20,
  },
  margin: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
}));

const {
  PASSWORD_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MATCH
} = ERROR_MESSAGE;

const PasswordChange = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { register, errors, handleSubmit, watch } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    let convertedData = {
      ...data,
      id: user._id
    };
    dispatch(editUserPassword(convertedData))
      .then(() => {
        history.push(PATH_URL.USER);
      })
      .catch(() => []);
  }

  return (
    <Grid container justify="center">
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center">
            Change Password
          </Typography>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              name="currentPassword"
              label="Current Password"
              type="password"
              className={classes.margin}
              fullWidth
              inputRef={register({
                required: true,
                minLength: 6
              })}
              error={errors.currentPassword}
              helperText={(
                errors.currentPassword && errors.currentPassword.type === "required" &&
                PASSWORD_REQUIRED
              ) || (
                errors.currentPassword && errors.currentPassword.type === "minLength" &&
                PASSWORD_MIN_LENGTH
              )}
            />
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              className={classes.margin}
              fullWidth
              inputRef={register({
                required: true,
                minLength: 6
              })}
              error={errors.newPassword}
              helperText={(
                errors.newPassword && errors.newPassword.type === "required" &&
                PASSWORD_REQUIRED
              ) || (
                errors.newPassword && errors.newPassword.type === "minLength" &&
                PASSWORD_MIN_LENGTH
              )}
            />
            <TextField
              name="newPassword2"
              label="Confirm New Password"
              type="password"
              className={classes.margin}
              fullWidth
              inputRef={register({
                required: true,
                validate: (value) => {
                  return value === watch('newPassword');
                }
              })}
              error={errors.newPassword2}
              helperText={(
                errors.newPassword2 && errors.newPassword2.type === "required" &&
                PASSWORD_REQUIRED
              ) || (
                errors.newPassword2 && errors.newPassword2.type === "validate" &&
                PASSWORD_MATCH
              )}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.margin}
              fullWidth
            >
              Submit
            </Button>
          </form>
          <Button
            component={Link}
            to={PATH_URL.USER}
          >
            Go Back
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PasswordChange;