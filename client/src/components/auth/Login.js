import React from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AUTH_TYPE, ERROR_MESSAGE, REGEX } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  margin: {
    marginRight: 0,
    marginLeft: 0
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const { login } = AUTH_TYPE;
const {
  emailRequired,
  emailValid,
  passwordRequired,
  passwordMinLength,
} = ERROR_MESSAGE;
const { email } = REGEX;

const Login = ({ onSubmit }) => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name="email"
        label="Email"
        className={classes.margin}
        fullWidth
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
      <br />
      <TextField
        name="password"
        label="Password"
        type="password"
        className={classes.margin}
        fullWidth
        inputRef={register({ required: true, minLength: 6 })}
        error={errors.password}
        helperText={(
          errors.password && errors.password.type === "required" &&
          passwordRequired
        ) || (
          errors.password && errors.password.type === "minLength" &&
          passwordMinLength
        )}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        className={classes.margin}
        fullWidth
      >
        {login}
      </Button>
    </form>
  );
}

export default Login;