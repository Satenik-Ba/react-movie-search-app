import React, { useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import { USER_PAGE } from '../../constants/routes';
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
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    setError('');
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push(USER_PAGE);
    } catch {
      setError('Failed to create an account');
    }
  }
  // dialog vs alert to show error message
  return (
    <div className={classes.root}>
      <FormControl component="form" onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <TextField
          inputRef={emailRef}
          label="Email"
          type="email"
          variant="outlined"
          required
        />
        <TextField
          inputRef={passwordRef}
          label="Password"
          type="password"
          variant="outlined"
          required
        />
        <TextField
          inputRef={passwordConfirmRef}
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
