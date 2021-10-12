import * as React from 'react';
import {AppBar} from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AcordionCountryCategories from './AcordionCountryCategories';
import logo from '../images/filmLogo.jpg';
import SearchFilms from './SearchFilms';
import CategoryFilms from './CategoryFilms';
import { SIGNIN_ROUTE, REGISTER_ROUTE, HOME_ROUTE} from '../../constants/routes';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => {
  return {
    root: {
      cursor: 'pointer',
    },
  };
});

function Header() {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="FilmsAppBar" position="static">
        <Toolbar>
          <Link id="logoDiv" to={HOME_ROUTE} >
            <img src={logo} alt="Logo" />
            <p>
              <span id="logodivSpanOne">A</span>
              <span id="logodivSpanTwo">R</span>
              <span id="logodivSpanThree">M</span>FILM
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
          <Button component={Link} to={SIGNIN_ROUTE} color="inherit">
            Login
          </Button>
          <Button component={Link} to={REGISTER_ROUTE} color="inherit">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
