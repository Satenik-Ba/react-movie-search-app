import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { makeStyles } from "@mui/styles";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { arrayUnion } from "@firebase/firestore";
import { useSelector } from "react-redux";
import SelectedMovie from "../redux/SelectedMovie";

const useStyles = makeStyles({
  icon: {
    color: "white ",
  },
  backgroundIcon: {
    color: "#BF3B7C",
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function FavoriteVideoIcon() {
  const classes = useStyles();
  const currentUserId = useSelector((state) => state.userInfo.userId.userId);
  const movie = useSelector(
    (state) => state.SelectedMovie.selectedMovie.selectedMovie
  );
  async function onFavoriteVideoByUser() {
    // console.log(id);
    const userRef = doc(firestore, "users", currentUserId);

    // Update the timestamp field with the value from the server
    await updateDoc(userRef, {
      favoriteMovie: { ...movie },
    });
  }

  return (
    <div>
      <Checkbox
        {...label}
        onClick={onFavoriteVideoByUser}
        icon={<FavoriteBorder className={classes.icon} />}
        checkedIcon={<Favorite className={classes.backgroundIcon} />}
        id={SelectedMovie.id}
      />
    </div>
  );
}
