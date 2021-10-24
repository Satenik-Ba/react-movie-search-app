import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Carousel from "./Carousel";
import UserFavorites from "./UserFavorites";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#232A3E",
    color: "white",
  },
});

function UserPage() {
  const classes = useStyles();
  const userName = useSelector((state) => state.userInfo.userName);
  const isAuthenticated = useSelector(
    (state) => state.userInfo.isAuthenticated
  );

  return (
    <div className={classes.root}>
      <UserFavorites />
      <Carousel />
    </div>
  );
}

export default UserPage;
