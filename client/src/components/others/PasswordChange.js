import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ERROR_MESSAGE } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const {
  passwordRequired,
  passwordMinLength,
  passwordMatch
} = ERROR_MESSAGE;

const PasswordChange = () => {
  const classes = useStyles();
  const { register, errors, handleSubmit, watch } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    // Send Email
    history.push('/user');
  }

  return (
    <Paper>
      <h1>Change Password</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          name="currentPassword"
          label="Current Password"
          inputRef={register({
            required: true,
            minLength: 6
          })}
          error={errors.currentPassword}
          helperText={(
            errors.currentPassword && errors.currentPassword.type === "required" &&
            passwordRequired
          ) || (
            errors.currentPassword && errors.currentPassword.type === "minLength" &&
            passwordMinLength
          )}
        />
        <TextField
          name="newPassword"
          label="New Password"
          inputRef={register({
            required: true,
            minLength: 6
          })}
          error={errors.newPassword}
          helperText={(
            errors.newPassword && errors.newPassword.type === "required" &&
            passwordRequired
          ) || (
            errors.newPassword && errors.newPassword.type === "minLength" &&
            passwordMinLength
          )}
        />
        <TextField
          name="newPassword2"
          label="Confirm New Password"
          inputRef={register({
            required: true,
            validate: (value) => {
              return value === watch('newPassword');
            }
          })}
          error={errors.newPassword2}
          helperText={(
            errors.newPassword2 && errors.newPassword2.type === "required" &&
            passwordRequired
          ) || (
            errors.newPassword2 && errors.newPassword2.type === "validate" &&
            passwordMatch
          )}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <Link to="/user">
        <Button
          color="primary"
          className={classes.button}
          >
          Go Back
        </Button>
      </Link>
    </Paper>
  );
}

export default PasswordChange;