import React from "react";
import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AcordionCountryCategories from "./AcordionCountryCategories";
import logo from "../images/filmLogo.png";
import SearchFilms from "./SearchFilms";
import CategoryFilms from "./CategoryFilms";
import {
  SIGNIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
  USER_PAGE,
} from "../../constants/routes";
import { Link } from "react-router-dom";

import UserAvatar from "./UserAvatar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const useStyles = makeStyles(() => {
  return {
    root: {
      cursor: "pointer",
    },
    filmsAppBar: {
      backgroundColor: "#222222 !important",
      color: "#d1d2d6 !important",
      maxHeight: "69px !important",
    },
    logo: {
      maxWidth: "250px",
      display: "flex",
      textAlign: "center",
      fontSize: "23px",
      fontWeight: "bold",
    },
    logoP: {
      marginLeft: "25px",
      color: "white",
    },
    logoSpanOne: {
      color: "#C52D3D",
    },
    logoSpanTwo: {
      color: "#006DBA",
    },
    logoSpanThree: {
      color: "#E99800",
    },
    btnCol: {
      backgroundColor: "#C32D3D !important",
      color: "#BCBDC0 !important",
      marginRight: "5px !important",
      borderRadius: "15px !important",
      fontWeight: "bold !important",
    },
    registerBtn: {
      backgroundColor: "blue !important",
      fontWeight: "bold !important",
      marginLeft: "2px !important",
    },
    loginBtn: {
      backgroundColor: "#BF3B7C !important",
      fontWeight: "bold !important",
    },
    myList: {
      "text-decoration": "none",
      color: "#C52D3D",
      backgroundColor: "#212121",
      borderRadius: "8px",
      "font-size": "1.15rem",
      marginTop: "18px",
      fontWeight: "bold",
    },
    "& a": {
      "&:hover": {
        backgroundColor: "#7b84a4",
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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isAuth && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
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
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
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
        <>
          <MenuItem onClick={handleMobileMenuOpen}>
            <Link to={USER_PAGE} className={classes.myList}>
              Favorites
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuOpen}>
            <UserAvatar />
          </MenuItem>
        </>
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
            <img src={logo} alt="Logo" />
            <Link
              className={classes.logo}
              onClick={() => document.location.assign(HOME_ROUTE)}
            >
              {/*  */}
              <p className={classes.logoP}>
                <span className={classes.logoSpanOne}>A</span>
                <span className={classes.logoSpanTwo}>R</span>
                <span className={classes.logoSpanThree}>M</span>FLIX
              </p>
            </Link>
          </IconButton>

          <SearchFilms />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!isAuth && (
              <>
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
              </>
            )}

            {isAuth && (
              <>
                <Link to={USER_PAGE} className={classes.myList}>
                  My Favorites
                </Link>
                <UserAvatar />
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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

    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar className={classes.filmsAppBar} position="fixed">
    //     <Toolbar>
    //       <Link
    //         className={classes.logo}
    //         onClick={() => document.location.assign(HOME_ROUTE)}
    //       >
    //         <img src={logo} alt="Logo" />
    //         <p className={classes.logoP}>
    //           <span className={classes.logoSpanOne}>A</span>
    //           <span className={classes.logoSpanTwo}>R</span>
    //           <span className={classes.logoSpanThree}>M</span>FLIX
    //         </p>
    //       </Link>
    //       <AcordionCountryCategories />
    //       <CategoryFilms />

    //       <SearchFilms />
    //       {isAuth && (
    //         <Link to={USER_PAGE} className={classes.myList}>
    //           Favorites
    //         </Link>
    //       )}
    //       {!isAuth && (
    //         <>
    //           <Button component={Link} to={SIGNIN_ROUTE} color="inherit">
    //             Log in
    //           </Button>
    //           <Button component={Link} to={REGISTER_ROUTE} color="inherit">
    //             Register
    //           </Button>
    //         </>
    //       )}
    //       {isAuth && <UserAvatar />}
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}

export default Header;
