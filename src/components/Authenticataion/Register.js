import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HOME_ROUTE } from '../../constants/routes';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    'margin-top': 'auto',
    'margin-bottom': 'auto',
  },
  button: {
    backgroundColor: '#171c2c',
    alignSelf: 'center',
    width: '25rem',
    fontSize: '1.2rem',
    color: 'white',
    height: '3.5rem',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#7b84a4',
    },
    '&:disabled': {
      backgroundColor: 'red',
    },
  },
  heading: {
    color: '#171c2c',
    fontWeight: 600,
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
  errorAlert: {
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
});

const Register = () => {
  const classes = useStyles();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(
        "The Password Confirmation Doesn't Match Entered Password"
      );
    }
    setError('');
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoading(true);
      history.push(HOME_ROUTE);
    } catch (error) {
      setLoading(false);
      switch (error.code) {
        case 'auth/email-already-in-use':
          return setError(
            'The provided email is already in use by an existing user. Please enter a different email address.'
          );
        case 'auth/invalid-email':
          emailRef.current.value = '';
          return setError('Invalid email. Please enter a valid email address.');
        case 'auth/weak-password':
          return setError(
            'Invalid password. Password must be six or more characters.'
          );
        default:
          return setError(
            'Invalid email or password. Please enter a valid email and/or password'
          );
      }
    }
  }
  useEffect(() => {
    if (user !== null) {
      updateProfile(user, {
        displayName: userNameRef.current.value,
      }).catch((error) => {
        console.log(error.message);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user !== null) {
      const userRef = doc(firestore, 'users', user.uid);
      const data = {};
      setDoc(userRef, data);
    }
  }, [user]);

  return (
    <div className={classes.root}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25rem' },
        }}
      >
        {error && (
          <Alert
            variant="filled"
            severity="error"
            width="25rem"
            className={classes.errorAlert}
          >
            {error}
          </Alert>
        )}
        <FormControl component="form" onSubmit={handleSubmit} margin="normal">
          <h1 className={classes.heading}>Registration Form</h1>
          <TextField
            inputRef={userNameRef}
            label="Username"
            type="text"
            variant="outlined"
            required
          />
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
      </Box>
    </div>
  );
};

export default Register;
