import React, { useRef, useState, useEffect } from 'react';
import {
  getAuth,
  updateProfile,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { UserInfoActions } from '../redux/UserInfo';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { HOME_ROUTE } from '../../constants/routes';
import Logout from './Logout';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    'margin-top': 'auto',
    'margin-bottom': 'auto',
    '& a': {
      textDecoration: 'none',
      color: '#171c2c',
      fontSize: '1.15rem',
      fontWeight: 700,
      '&:hover': {
        color: '#7b84a4',
        fontWeight: 400,
      },
    },
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
  span: {
    fontSize: '1.15rem',
    textDecoration: 'none',
    padding: '1rem',
    color: 'black',
  },
});
const Account = () => {
  const classes = useStyles();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const history = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;

  const [open, setOpen] = React.useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  const userName = useSelector((state) => state.userInfo.userName);
  const userEmail = user.email;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handlePasswordOpen = () => {
    setOpenPassword(true);
  };
  const handleDeleteOpen = () => {
    setOpenDeleteAccount(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePasswordClose = () => {
    setOpenPassword(false);
  };
  const handleDeleteClose = () => {
    setOpenDeleteAccount(false);
  };
  const dispatch = useDispatch();
  
  function handleUsernameUpdate(e) {
    e.preventDefault();
    if (userNameRef.current.value.trim() !== '') {
      updateProfile(auth.currentUser, {
        displayName: userNameRef.current.value,
      });
      history.push(HOME_ROUTE);
      userNameRef.current.value = '';
      setOpen(false);
    } else {
      setError('Username is empty. Please enter a valid username');
    }
    setError('');
  }
  function handlePasswordUpdate(e) {
    e.preventDefault();
    let newPassword = passwordRef.current.value;
    if (passwordRef.current.value === passwordConfirmRef.current.value) {
      try {
        updatePassword(user, newPassword);
        history.push(HOME_ROUTE);
      } catch (error) {
        setError(error);
      }
    } else {
      setError('password and re-type password do not match');
    }
  }

  function handleDeleteAccount(e) {
    e.preventDefault();
    deleteUser(user);
    dispatch(
      UserInfoActions.setUserInfo({
        userName: '',
        isAuthenticated: false,
      })
    );
    history.push(HOME_ROUTE);
  }

  return (
    <div className={classes.root}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25rem' },
        }}
      >
        {error && (
          <Alert variant="filled" severity="error" width="25rem">
            {error}
          </Alert>
        )}
        <h1 className={classes.heading}>Your Account</h1>
        <h3>Email: {userEmail}</h3>
        <h3>Username: {userName}</h3>
        <Card sx={{ minWidth: 275 }}>
          <button onClick={handleClickOpen} className={classes.button}>
            Update Username
          </button>
          <div>
            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Update Username</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField
                    inputRef={userNameRef}
                    label="Username"
                    type="text"
                    variant="outlined"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUsernameUpdate} autoFocus>
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <button onClick={handlePasswordOpen} className={classes.button}>
            Change Password
          </button>
          <div>
            <Dialog
              open={openPassword}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Change Password</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField
                    inputRef={passwordRef}
                    label="Password"
                    type="password"
                    variant="outlined"
                  />
                  <TextField
                    inputRef={passwordConfirmRef}
                    label="Re-type Password"
                    type="password"
                    variant="outlined"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePasswordClose}>Cancel</Button>
                <Button onClick={handlePasswordUpdate} autoFocus>
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <button onClick={handleDeleteOpen} className={classes.button}>
            Delete Account
          </button>
          <div>
            <Dialog
              open={openDeleteAccount}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Delete Account</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete your account? Your profile's
                  history will be gone forever and you won't be able to access
                  it again.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose}>Cancel</Button>
                <Button onClick={handleDeleteAccount} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default Account;
