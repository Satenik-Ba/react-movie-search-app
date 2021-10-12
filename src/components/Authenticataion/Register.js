import React, { useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useAuth } from './AuthContext';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <div className={classes.root}>
      <FormControl component="form" onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        {/* <TextField
          ref={firstNameRef}
          label="First Name"
          type="text"
          variant="outlined"
        />
        <TextField
          ref={lastNameRef}
          label="Last Name"
          type="text"
          variant="outlined"
        /> */}
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
        <button className={classes.button} type="submit">
          Register
        </button>
      </FormControl>
    </div>
  );
};

export default Register;
