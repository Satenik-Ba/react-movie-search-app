import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import FavoriteVideoIcon from "./FavoriteVideoIcon";
import ReitingVideoStars from "./ReitingVideoStars";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import VideoMoviePage from "./VideoMoviePage";
import {
  VIDEO_PAGE,
  HOME_ROUTE,
  USER_PAGE,
  REGISTER_ROUTE,
} from "../../constants/routes";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectedMovieAction } from "../redux/SelectedMovie";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

import { imgSrc } from "../../constants/constants";
import ManageFavorites from "./ManageFavorites";

const useStyles = makeStyles({
  text: {
    height: "50%",
    overflow: "hidden",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#171C2C",
    position: "absolute",
    opacity: "0",
    "&:hover": {
      opacity: "0.7",
      cursor: "all-scroll",
    },
  },
  cursor: {
    cursor: "pointer",
  },
});
const Movie = ({ movie, deleteIcon }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const comentUserName = useSelector((state) => state.userInfo.userName);
  const commentsRef = doc(firestore, `/comments/${movie.id}`);
  getDoc(commentsRef).then((docSnap) => {
    if (!docSnap.exists()) {
      const data = {
        movieComments: [],
      };
      setDoc(commentsRef, data);
    }
  });
  const handleMovieClick = () => {
    dispatch(
      selectedMovieAction.changeMovie({
        selectedMovie: movie,
      })
    );

    history.push(VIDEO_PAGE);
  };

  return (
    <>
      <ImageListItem
        sx={{
          width: "17vw",
          height: 100,
          padding: "8px",
          lineHeight: "1.3 !important",
        }}
        cols={8}
      >
        <ReitingVideoStars defaultValue={movie.vote_average} />
        <div className={classes.text}>{movie.overview}</div>
        <img
          className={classes.cursor}
          onClick={handleMovieClick}
          src={imgSrc + `${movie.poster_path}`}
          alt="movie image poster"
          loading="lazy"
        />
        <ImageListItemBar
          // title={title}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.94)" }}
              aria-label={`info abou`}
            >
              <ManageFavorites favMovie={movie} deleteIcon={deleteIcon} />
            </IconButton>
          }
        />
      </ImageListItem>
    </>
  );
};
export default Movie;
