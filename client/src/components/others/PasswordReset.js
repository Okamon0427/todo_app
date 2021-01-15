import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ERROR_MESSAGE, REGEX } from '../../utils/constants';

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
  emailRequired,
  emailValid,
} = ERROR_MESSAGE;
const { email } = REGEX;

const PasswordReset = () => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    // Send Email
    history.push('/');
  }

  return (
    <Paper>
      <h1>Reset Password</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          name="email"
          label="Email"
          inputRef={register({
            required: true,
            pattern: email
          })}
          error={errors.email}
          helperText={(
            errors.email && errors.email.type === "required" &&
            emailRequired
          ) || (
            errors.email && errors.email.type === "pattern" &&
            emailValid
          )}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Send Email
        </Button>
      </form>
      <Link to="/">
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

export default PasswordReset;