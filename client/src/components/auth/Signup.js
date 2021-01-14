import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

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

const Signup = ({
  formData: { name, email, password, password2 },
  onChange,
  onSubmit
}) => {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(e) => onSubmit(e)}
    >
      <FormControl>
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
      </FormControl>
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