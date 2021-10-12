import React, { useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#171c2c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#7b84a4',
    },
  },
});

const Register = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <div className={classes.root}>
      <FormControl component="form" onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        {currentUser.email}
        <TextField
          ref={emailRef}
          label="Email"
          type="email"
          variant="outlined"
          required
        />
        <TextField
          ref={passwordRef}
          label="Password"
          type="password"
          variant="outlined"
          required
        />
        <TextField
          ref={passwordConfirmRef}
          label="Re-Type Password"
          type="password"
          variant="outlined"
          required
        />
        <button className={classes.button} disabled={loading} type="submit">
          Register
        </button>
      </FormControl>
    </div>
  );
};

export default Register;
