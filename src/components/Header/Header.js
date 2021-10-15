import React from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AcordionCountryCategories from './AcordionCountryCategories';
import logo from '../images/filmLogo.png';
import SearchFilms from './SearchFilms';
import CategoryFilms from './CategoryFilms';
import {
  SIGNIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
} from '../../constants/routes';
import { Link } from 'react-router-dom';
import Logout from '../Authenticataion/Logout';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => {
  return {
    root: {
      cursor: 'pointer',
    },
    filmsAppBar: {
      backgroundColor: '#171c2c !important',
      color: '#d1d2d6 !important',
    },
    logo: {
      width: '250px',
      display: 'flex',
      textAlign: 'center',
      fontSize: '23px',
      fontWeight: 'bold',
    },
    logoP: {
      marginLeft: '25px',
      color: 'white',
    },
    logoSpanOne: {
      color: 'red',
    },
    logoSpanTwo: {
      color: 'blue',
    },
    logoSpanThree: {
      color: 'orange',
    },
    registerBtn: {
      backgroundColor: 'blue !important',
      fontWeight: 'bold !important',
      marginLeft: '2px !important',
    },
    loginBtn: {
      backgroundColor: '#BF3B7C !important',
      fontWeight: 'bold !important',
    },
  };
});

function Header() {
  const classes = useStyles();
  const isAuth = useSelector((state) => state.userInfo.isAuthenticated);
  console.log(isAuth, 'IsAUTHENTICATED');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.filmsAppBar} position="fixed">
        <Toolbar>
          <Link className={classes.logo} to={HOME_ROUTE}>
            <img src={logo} alt="Logo" />
            <p className={classes.logoP}>
              <span className={classes.logoSpanOne}>A</span>
              <span className={classes.logoSpanTwo}>R</span>
              <span className={classes.logoSpanThree}>M</span>FILM
            </p>
          </Link>
          <AcordionCountryCategories />
          <CategoryFilms />
          <Typography
            className={classes.root}
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            About
          </Typography>

          <SearchFilms />

          {!isAuth && (
            <Button component={Link} to={SIGNIN_ROUTE} color="inherit">
              Log in{' '}
            </Button>
          )}
          {!isAuth && (
            <Button component={Link} to={REGISTER_ROUTE} color="inherit">
              Register
            </Button>
          )}
          {isAuth && <Logout />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
