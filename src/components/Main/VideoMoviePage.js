import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";
// import IconButton from "@mui/material/IconButton";
// import FavoriteVideoIcon from "./FavoriteVideoIcon";
// import ReitingVideoStars from "./ReitingVideoStars";
// import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import YouTube from "react-youtube";
import { useHistory } from "react-router-dom";
// import { HOME_ROUTE } from "../../constants/routes";
// import { selectedMovieAction } from "../redux/SelectedMovie";
// import { useDispatch } from "react-redux";

const opts = {
  height: '400px',
  width: '800px',
  playerVars: {
    autoplay: 0,
  },
};
const useStyles = makeStyles({
  root: {
    color: 'red',
    width: '100vw',
    height: '800px',
    color: 'white',
    'background-color': '#232A3E',
    // marginTop: "75px",
    paddingTop: '85px',
  },
  imgWidth: {
    width: '200px',
    height: '300px',
  },
  displayFlex: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
});
const VideoMoviePage = () => {
  const classes = useStyles();
  const [movieKey, setMovieKey] = useState();
  const [persons, setPersons] = useState([]);
  const history = useHistory();
  // const dispatch = useDispatch();
  const movie = useSelector((state) => state.SelectedMovie.selectedMovie);
  // const isSelected = useSelector((state) => state.SelectedMovie.isSelected);
  const acters = persons.filter(
    (person) => person.known_for_department === "Acting"
  );
  const directors = persons.filter(
    (person) => person.known_for_department === "Directing"
  );

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/' +
        `${movie.id}` +
        '/videos?api_key=6241e31f828487ad21497bc364be7041'
    )
      .then((response) => response.json())
      .then((result) => {
        setMovieKey(result.results);
      });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        `${movie.id}` +
        "/credits?api_key=6241e31f828487ad21497bc364be7041&language=en-US"
    )
      .then((response) => response.json())
      .then((result) => {
        setPersons(result.cast);
      });
    // dispatch(selectedMovieAction.isSelected());
  }, []);

  return (
    <div className={classes.root}>
      {movieKey && <YouTube videoId={movieKey.key} opts={opts} />}
      <div className={classes.displayFlex}>
        <img
          className={classes.imgWidth}
          src={'https://image.tmdb.org/t/p/w500/' + `${movie.poster_path}`}
          alt=""
          loading="lazy"
        />
        <div
          style={{
            width: '43%',
          }}
        >
          <h1> {movie.title}</h1>
          <h4>
            Director:
            {directors.map((director) => (
              <span> {director.name},</span>
            ))}
          </h4>
          <h4>
            Acters:
            {acters.map((acter) => (
              <span> {acter.name},</span>
            ))}
          </h4>
          <h4>Movie Overview: {movie.overview}</h4>
          <h4>Release Date: {movie.release_date}</h4>
        </div>
      </div>
    </div>
  );
};
export default VideoMoviePage;
