import React, { useEffect } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import FavoriteVideoIcon from "./FavoriteVideoIcon";
import ReitingVideoStars from "./ReitingVideoStars";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VideoMoviePage from "./VideoMoviePage";
import { VIDEO_PAGE, HOME_ROUTE } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectedMovieAction } from "../redux/SelectedMovie";

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

const Movie = ({ movie, id }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isSelected = useSelector((state) => state.SelectedMovie.isSelected);

  const handleMovieClick = () => {
    dispatch(
      selectedMovieAction.changeMovie({
        selectedMovie: movie,
      })
    );
    history.push(VIDEO_PAGE);
    // dispatch(
    //   selectedMovieAction.isSelected()
    // );
  };

  return (
    <>
      <ImageListItem
        sx={{
          width: "20vw",
          height: 100,
          padding: "5px",
          lineHeight: "1.3 !important",
        }}
        cols={8}
      >
        <ReitingVideoStars />

        <div className={classes.text}>{movie.overview}</div>
        <img
          className={classes.cursor}
          onClick={handleMovieClick}
          src={"https://image.tmdb.org/t/p/w500/" + `${movie.poster_path}`}
          alt=""
          loading="lazy"
        />

        <ImageListItemBar
          // title={title}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.94)" }}
              aria-label={`info abou`}
            >
              <FavoriteVideoIcon />
              <PlayCircleOutlineIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </>
  );
};
export default Movie;
