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
  USER_NAME_REQUIRED,
  EMAIL_REQUIRED,
  EMAIL_VALID,
  PASSWORD_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MATCH
} = ERROR_MESSAGE;
const { EMAIL_REGEX } = REGEX;

const Signup = ({ onSubmit }) => {
  const classes = useStyles();
  const { register, errors, handleSubmit, watch } = useForm();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name="name"
        label="User Name"
        className={classes.margin}
        fullWidth
        inputRef={register({ required: true })}
        error={errors.name}
        helperText={errors.name && USER_NAME_REQUIRED}
      />
      <br />
      <TextField
        name="email"
        label="Email"
        className={classes.margin}
        fullWidth
        inputRef={register({
          required: true,
          pattern: EMAIL_REGEX
        })}
        error={errors.email}
        helperText={(
          errors.email && errors.email.type === "required" &&
          EMAIL_REQUIRED
        ) || (
          errors.email && errors.email.type === "pattern" &&
          EMAIL_VALID
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
          PASSWORD_REQUIRED
        ) || (
          errors.password && errors.password.type === "minLength" &&
          PASSWORD_MIN_LENGTH
        )}
      />
      <br />
      <TextField
        name="password2"
        label="Confirm Password"
        type='password'
        className={classes.margin}
        fullWidth
        inputRef={register({
          required: true,
          validate: (value) => {
            return value === watch('password');
          }
        })}
        error={errors.password2}
        helperText={(
          errors.password2 && errors.password2.type === "required" &&
          PASSWORD_REQUIRED
        ) || (
          errors.password2 && errors.password2.type === "validate" &&
          PASSWORD_MATCH
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
        SIGN UP
      </Button>
    </form>
  );
}

export default Signup;