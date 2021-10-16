import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#232A3E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    color: 'black',
  },
});

function UserPage() {
  const classes = useStyles();
  const userEmail = useSelector((state) => state.userInfo.userEmail.userEmail);
  const userName = useSelector(state => state.userInfo.userName.userName)
  const userId = useSelector(state => state.userInfo.userId.userId)
  const isAuthenticated = useSelector(state => state.userInfo.isAuthenticated)
  console.log(userEmail, 'userEmail is taken from state');
  return (
    <div className={classes.root}>
      {isAuthenticated && <h1>Welcome {userEmail}</h1>}
      {isAuthenticated && <h1>Welcome {userName} </h1>}
      {isAuthenticated && <h1>Welcome {userId}</h1>}    
    </div>
  );
}

export default UserPage;
