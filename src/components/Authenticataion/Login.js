import React, { useRef, useState } from 'react';
import { REGISTER_ROUTE, HOME_ROUTE } from '../../constants/routes';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    'margin-top': 'auto',
    'margin-bottom': 'auto',
  },
  button: {
    backgroundColor: '#171c2c',
    alignSelf: 'center',
    width: '25rem',
    fontSize: '1.2rem',
    color: 'white',
    height: '3.6rem',
    '&:hover': {
      backgroundColor: '#7b84a4',
    },
  },
  heading: {
    color: '#171c2c',
    fontWeight: 600,
  },
});
const Login = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const history = useHistory();
  const auth = getAuth();

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function handleSignIn(e) {
    e.preventDefault();
    setError('');

    try {
      login(emailRef.current.value, passwordRef.current.value);
      history.push(HOME_ROUTE);
    } catch {
      setError('Failed to log in');
    }
  }
  return (
    <div className={classes.root}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25rem' },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl component="form" onSubmit={handleSignIn} margin="normal">
          <h1 className={classes.heading}>Sign In</h1>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            inputRef={emailRef}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            inputRef={passwordRef}
            required
          />
          <button className={classes.button}>Log In</button>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />
          </FormGroup>
          <Link>Forgot Password?</Link>
          <p>
            New to ArmFilm?{' '}
            <span>
              <Link to={REGISTER_ROUTE}>Sign Up Now</Link>
            </span>
          </p>
        </FormControl>
      </Box>
    </div>
  );
};

export default Login;
