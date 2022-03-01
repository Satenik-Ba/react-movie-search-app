import React from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import {
  SIGNIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
  USER_PAGE,
} from '../../constants/routes';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import logo from '../../images/filmLogo.svg';
import SearchFilms from './SearchFilms';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles(() => {
  return {
    root: {
      cursor: 'pointer',
    },
    filmsAppBar: {
      backgroundColor: '#222222 !important',
      color: '#d1d2d6 !important',
      maxHeight: '69px !important',
    },
    filmLogo: {
      width: '60px',
      filter:
        'invert(22%) sepia(74%) saturate(2715%) hue-rotate(337deg) brightness(87%) contrast(88%)',
    },
    logo: {
      maxWidth: '250px',

      display: 'flex',
      textAlign: 'center',
      fontSize: '23px',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
    logoP: {
      marginLeft: '10px',
      marginRight: '30px',
      color: 'white',
    },
    logoSpanThree: {
      color: '#C32D3D',
    },
    btnCol: {
      backgroundColor: '#C32D3D !important',
      color: '#BCBDC0 !important',
      marginRight: '5px !important',
      borderRadius: '15px !important',
      fontWeight: 'bold !important',
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
      color: '#C52D3D',
      backgroundColor: '#212121',
      borderRadius: '8px',
      'font-size': '1.15rem',
      marginTop: '18px',
      fontWeight: 'bold',
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isAuth && (
        <MenuItem>
          <IconButton size="large" color="inherit">
            <Button
              className={classes.btnCol}
              component={Link}
              to={SIGNIN_ROUTE}
              color="inherit"
            >
              Log in
            </Button>
          </IconButton>
        </MenuItem>
      )}
      {!isAuth && (
        <MenuItem>
          <IconButton size="large" color="inherit">
            <Button
              className={classes.btnCol}
              component={Link}
              to={REGISTER_ROUTE}
              color="inherit"
            >
              Register
            </Button>
          </IconButton>
        </MenuItem>
      )}
      {isAuth && (
        <Stack>
          <MenuItem onClick={handleMobileMenuOpen}>
            <Link to={USER_PAGE} className={classes.myList}>
              Favorites
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuOpen}>
            <UserAvatar />
          </MenuItem>
        </Stack>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.filmsAppBar} position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt="Logo" className={classes.filmLogo} />
            <Link
              className={classes.logo}
              onClick={() => document.location.assign(HOME_ROUTE)}
            >
              {/*  */}
              <p className={classes.logoP}>
                <span className={classes.logoSpanThree}>M</span>FLIX
              </p>
            </Link>
          </IconButton>

          <SearchFilms />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {!isAuth && (
              <span>
                <Button
                  className={classes.btnCol}
                  component={Link}
                  to={SIGNIN_ROUTE}
                  color="inherit"
                >
                  Log in
                </Button>
                <Button
                  className={classes.btnCol}
                  component={Link}
                  to={REGISTER_ROUTE}
                  color="inherit"
                >
                  Register
                </Button>
              </span>
            )}

            {isAuth && (
              <Stack direction="row" spacing={2}>
                <Link to={USER_PAGE} className={classes.myList}>
                  My Favorites
                </Link>
                <UserAvatar />
              </Stack>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Header;
