import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { makeStyles } from "@mui/styles";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { arrayUnion } from "@firebase/firestore";
import { useSelector } from "react-redux";
import SelectedMovie from "../redux/SelectedMovie";
import { SIGNIN_ROUTE } from "../../constants/routes";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  icon: {
    color: "white ",
  },
  backgroundIcon: {
    color: "#BF3B7C",
  },
  clearBackground: {
    color: "none",
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function FavoriteVideoIcon({ favMovie }) {
  const classes = useStyles();
  const currentUserId = useSelector((state) => state.userInfo.userId);
  const movie = useSelector((state) => state.SelectedMovie.selectedMovie);

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setChecked(false);
  };

  const handleLogin = () => {
    history.push(SIGNIN_ROUTE);
  };
  async function onFavoriteVideoByUser() {
    const userRef = doc(firestore, "users", currentUserId);
    await updateDoc(userRef, {
      favoriteMovies: arrayUnion(favMovie),
    });
  }

  return (
    <div>
      {currentUserId && (
        <Checkbox
          {...label}
          onClick={onFavoriteVideoByUser}
          icon={<FavoriteBorder className={classes.icon} />}
          checkedIcon={<Favorite className={classes.backgroundIcon} />}
          // id={SelectedMovie.id}
        />
      )}
      {!currentUserId && (
        <div>
          <Checkbox
            onClick={handleClickOpen}
            {...label}
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleLogin} autoFocus>
                Login
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}
