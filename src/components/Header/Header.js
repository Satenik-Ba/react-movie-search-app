import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AcordionCountryCategories from "./AcordionCountryCategories";
import logo from "../images/filmLogo.jpg";
import SearchFilms from "./SearchFilms";
import CategoryFilms from "./CategoryFilms";

const useStyles = makeStyles(() => {
  return {
    root: {
      cursor: "pointer",
    },
    filmsAppBar: {
      backgroundColor: "#171c2c !important",
      color: "#d1d2d6 !important",
    },
    logo: {
      width: "250px",
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
      color: "red",
    },
    logoSpanTwo: {
      color: "blue",
    },
    logoSpanThree: {
      color: "orange",
    },
  };
});

function Header() {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.filmsAppBar} position="static">
        <Toolbar>
          <div className={classes.logo}>
            <img src={logo} alt="Logo" />
            <p className={classes.logoP}>
              <span className={classes.logoSpanOne}>A</span>
              <span className={classes.logoSpanTwo} id="logodivSpanTwo">
                R
              </span>
              <span className={classes.logoSpanThree}>M</span>FILM
            </p>
          </div>
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

          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
