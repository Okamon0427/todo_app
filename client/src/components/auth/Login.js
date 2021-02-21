import React from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ERROR_MESSAGE, REGEX } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  margin: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
}));

const {
  EMAIL_REQUIRED,
  EMAIL_VALID,
  PASSWORD_REQUIRED,
  PASSWORD_MIN_LENGTH,
} = ERROR_MESSAGE;
const { EMAIL_REGEX } = REGEX;

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
        data-testid="email"
        className={classes.margin}
        fullWidth
        inputRef={register({
          required: true,
          pattern: EMAIL_REGEX
        })}
        error={errors.email}
        helperText={(
          errors.email && errors.email.type === "required" &&
          <span role="alert">{EMAIL_REQUIRED}</span>
        ) || (
          errors.email && errors.email.type === "pattern" &&
          <span role="alert">{EMAIL_VALID}</span>
        )}
      />
      <br />
      <TextField
        name="password"
        label="Password"
        type="password"
        data-testid="password"
        className={classes.margin}
        fullWidth
        inputRef={register({ required: true, minLength: 6 })}
        error={errors.password}
        helperText={(
          errors.password && errors.password.type === "required" &&
          <span role="alert">{PASSWORD_REQUIRED}</span>
        ) || (
          errors.password && errors.password.type === "minLength" &&
          <span role="alert">{PASSWORD_MIN_LENGTH}</span>
        )}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.margin}
        fullWidth
      >
        LOGIN
      </Button>
    </form>
  );
}

export default Login;