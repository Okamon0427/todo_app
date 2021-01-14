import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Signup from './Signup';
import Login from './Login';
import { AUTH_TYPE } from '../../utils/constants';

// const useStyles = makeStyles((theme) => ({}));

const { signup, login } = AUTH_TYPE;

const Landing = () => {
  // const classes = useStyles();
  const history = useHistory();

  const [authType, setAuthType] = useState(login);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    history.push('/dashboard');
  }

  const changeAuthType = () => {
    if (authType === login) {
      setAuthType(signup);
    } else {
      setAuthType(login);
    }
  }

  return (
    <Paper>
      <h1>
        {authType === signup ? signup : login}
      </h1>
      {authType === signup && (
        <Signup
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      )}
      {authType === login && (
        <Login
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      )}
      <Button
        color="primary"
        onClick={changeAuthType}
      >
        Change to {authType === signup ? login : signup}
      </Button>
    </Paper>
  );
}

export default Landing;