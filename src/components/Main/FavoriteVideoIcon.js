import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  icon: {
    color: "white ",
  },
  backgroundIcon: {
    color: "#BF3B7C",
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const onFavoriteVideoByUser = () => {
  console.log("hello");
};

export default function FavoriteVideoIcon() {
  const classes = useStyles();
  return (
    <div>
      <Checkbox
        {...label}
        onClick={onFavoriteVideoByUser}
        icon={<FavoriteBorder className={classes.icon} />}
        checkedIcon={<Favorite className={classes.backgroundIcon} />}
      />
    </div>
  );
}
