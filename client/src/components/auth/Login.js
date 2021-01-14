import React from 'react';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
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
      <TextField
        name="password"
        label="Password"
        type="password"
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
      {/* <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />
      </FormControl> */}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Login
      </Button>
    </form>
  );
}

export default Login;