import React from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AcordionCountryCategories from './AcordionCountryCategories';
import logo from '../images/filmLogo.png';
import SearchFilms from './SearchFilms';
import CategoryFilms from './CategoryFilms';
import {
  SIGNIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
  USER_PAGE,
} from '../../constants/routes';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserAvatar from './UserAvatar';
import { useDispatch } from 'react-redux';
// import { CatValueAction } from '../redux/categoryValue';

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
    myList: {
      'text-decoration': 'none',
      color: 'white',
      'font-size': '1.15rem',
    },
    '& a': {
      '&:hover': {
        backgroundColor: '#7b84a4',
      },
    },
  };
});

function Header() {
  const classes = useStyles();

  const isAuth = useSelector((state) => state.userInfo.isAuthenticated);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.filmsAppBar} position="fixed">
        <Toolbar>
          <Link
            className={classes.logo}
            onClick={() => document.location.assign(HOME_ROUTE)}
          >
            <img src={logo} alt="Logo" />
            <p className={classes.logoP}>
              <span className={classes.logoSpanOne}>A</span>
              <span className={classes.logoSpanTwo}>R</span>
              <span className={classes.logoSpanThree}>M</span>FLIX
            </p>
          </Link>
          <AcordionCountryCategories />
          <CategoryFilms />

          <SearchFilms />
          {isAuth && (
            <Link to={USER_PAGE} className={classes.myList}>
              Favorites
            </Link>
          )}
          {!isAuth && (
            <>
              <Button component={Link} to={SIGNIN_ROUTE} color="inherit">
                Log in
              </Button>
              <Button component={Link} to={REGISTER_ROUTE} color="inherit">
                Register
              </Button>
            </>
          )}
          {isAuth && <UserAvatar />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
