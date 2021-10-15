import React from 'react';
import Button from '@mui/material/Button';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { UserInfoActions } from '../redux/UserInfo';
import { useHistory } from 'react-router-dom';
import { HOME_ROUTE } from '../../constants/routes';

function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch(UserInfoActions.setLogout());
    });
    history.push(HOME_ROUTE);
  };
  return (
    <Button color="inherit" onClick={handleLogout}>
      Log Out
    </Button>
  );
}

export default Logout;
