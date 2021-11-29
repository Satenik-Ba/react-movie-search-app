import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { arrayUnion } from "@firebase/firestore";
import { useSelector } from "react-redux";
import Login from "../Authenticataion/Login";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  icon: {
    color: "white ",
  },
  backgroundIcon: {
    color: "#C32D3D",

  },
  clearBackground: {
    color: "none",
  },
  closeIcon: {
    position: "absolute",
    top: "58px",
    right: "56px",
  },
});
export default function FavoriteVideoIcon({ favMovie }) {
  const classes = useStyles();
  const currentUserId = useSelector((state) => state.userInfo.userId);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setChecked(false);
  };

  async function handleFavoriteClick() {
    const userRef = doc(firestore, "users", currentUserId);
    favMovie.isFavorite = true;
    favMovie.deleteIcon = true;

    await updateDoc(userRef, {
      favoriteMovies: arrayUnion(favMovie),
    });
    setIsDisabled(true);
  }

  return (
    <div className={classes.root}>
      {currentUserId && (
        <Checkbox
          size="small"
          onClick={handleFavoriteClick}
          disabled={isDisabled}
          icon={<FavoriteBorder className={classes.icon} />}
          checkedIcon={<Favorite className={classes.backgroundIcon} />}
        />
      )}
      {!currentUserId && (
        <div>
          <Checkbox
            onClick={handleClickOpen}
            checked={checked}
            icon={<FavoriteBorder className={classes.icon} />}
            checkedIcon={<Favorite className={classes.clearBackground} />}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please Login or Register to Add Movies/TV Shows to Your
                Favorites List.
              </DialogContentText>
              <Login />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
