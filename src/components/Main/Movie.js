import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import ReitingVideoStars from "./ReitingVideoStars";
import { VIDEO_PAGE } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedMovieAction } from "../redux/SelectedMovie";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { imgSrc } from "../../constants/constants";
import ManageFavorites from "./ManageFavorites";

const useStyles = makeStyles({
  // text: {
  //   maxHeight: "50%",
  //   overflow: "hidden",
  //   color: "white",
  //   fontSize: "13px",
  //   fontWeight: "bold",
  //   backgroundColor: "#171C2C",
  //   position: "absolute",
  //   opacity: "0",
  //   "&:hover": {
  //     opacity: "0.7",
  //     cursor: "all-scroll",
  //   },
  // },
  cursor: {
    cursor: "pointer",
  },
});

const Movie = ({ movie, deleteIcon }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
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
        {/* <div className={classes.text}>{movie.overview}</div> */}

        <img
          className={classes.cursor}
          onClick={handleMovieClick}
          src={imgSrc + `${movie.poster_path}`}
          alt="movie poster"
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
