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
  userNameRequired,
  emailRequired,
  emailValid,
  passwordRequired,
  passwordMinLength,
  passwordMatch
} = ERROR_MESSAGE;

const { email } = REGEX;

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
        inputRef={register({ required: true })}
        error={errors.name}
        helperText={errors.name && userNameRequired}
      />
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
      <TextField
        name="password2"
        label="Confirm Password"
        type='password'
        inputRef={register({
          required: true,
          validate: (value) => {
            return value === watch('password');
          }
        })}
        error={errors.password2}
        helperText={(
          errors.password2 && errors.password2.type === "required" &&
          passwordRequired
        ) || (
          errors.password2 && errors.password2.type === "validate" &&
          passwordMatch
        )}
      />
      {/* <FormControl>
        <InputLabel htmlFor="name">Your Name</InputLabel>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={e => onChange(e)}
        />
      </FormControl>
      <FormControl>
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
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password2">Confirm Password</InputLabel>
        <Input
          id="password2"
          name="password2"
          value={password2}
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
        Sign Up
      </Button>
    </form>
  );
}

export default Signup;