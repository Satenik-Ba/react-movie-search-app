import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import {REGISTER_ROUTE} from '../../constants/routes'
 
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
const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box component="form">
        <h1>Sign In</h1>
        <TextField label="Email" type="email" variant="outlined" required/>
        <TextField label="Password" type="password" variant="outlined" required/>
        <div>
          <button className={classes.button}>Log In</button>
        </div>
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
      </Box>
    </div>
  );
};

export default Login;
