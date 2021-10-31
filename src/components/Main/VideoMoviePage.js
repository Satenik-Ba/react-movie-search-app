import ComentsPage from "./ComentsPage";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
// import { useHistory } from 'react-router-dom';
import { imgSrc } from "../../constants/constants";

// import { HOME_ROUTE } from "../../constants/routes";
// import { selectedMovieAction } from "../redux/SelectedMovie";
// import movieOrTVAction from "../redux/movieOrTV";
// import { useDispatch } from "react-redux";
const opts = {
  playerVars: {
    autoplay: 0,
  },
};
const useStyles = makeStyles({
  root: {
    minHeight: "800px",
    color: "white",
    "background-color": "#232A3E",
    paddingTop: "85px",
  },
  imgWidth: {
    width: "300px",
    height: "400px",
  },
  displayFlex: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "60px",
  },
});
const VideoMoviePage = () => {
  const classes = useStyles();
  const [movieKey, setMovieKey] = useState();
  const [persons, setPersons] = useState([]);
  // const movie = useSelector((state) => state.SelectedMovie.selectedMovie);
  const movieOrTV = useSelector((state) => state.movieOrTV.movieOrTV);
  // const movieOrTV = localStorage.getItem("movieOrTV");
  // const dispatch = useDispatch();
  const movie = JSON.parse(localStorage.getItem("movieStor"));
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/" +
        `${movieOrTV}` +
        "/" +
        `${movie.id}` +
        "/videos?api_key=6241e31f828487ad21497bc364be7041"
    )
      .then((response) => response.json())
      .then((result) => {
        setMovieKey(result.results[0]);
      })
      .catch((err) => console.log(err.name));
    fetch(
      "https://api.themoviedb.org/3/" +
        `${movieOrTV}` +
        "/" +
        `${movie.id}` +
        "/credits?api_key=6241e31f828487ad21497bc364be7041&language=en-US"
    )
      .then((response) => response.json())
      .then((result) => {
        setPersons(result.cast.concat(result.crew));
      })
      .catch((err) => console.log(err.name));
    // dispatch(selectedMovieAction.isSelected());
  }, [movie.id]);
  const acters = persons.filter(
    (person) => person.known_for_department === "Acting"
  );
  const directors = persons.filter(
    (person) => person.known_for_department === "Directing"
  );

  console.log(movieOrTV);

  return (
    <div className={classes.root}>
      <div className={classes.displayFlex}>
        <img
          className={classes.imgWidth}
          src={imgSrc + `${movie.poster_path}`}
          alt="movie poster"
          loading="lazy"
        />
        <div
          style={{
            width: "53%",
          }}
        >
          <h2> {movie.title}</h2>
          <h4>
            Director:
            {directors.map((director) => (
              <span> {director.name},</span>
            ))}
          </h4>
          <h5>Movie Overview: {movie.overview}</h5>
          <h4>Release Date: {movie.release_date}</h4>

          <h5>
            Acters:
            {acters.map((acter) => (
              <span> {acter.name},</span>
            ))}
          </h5>
        </div>
      </div>
      {movieKey && <YouTube videoId={movieKey.key} opts={opts} />}
      <ComentsPage movie1={movie} />
    </div>
  );
};
export default VideoMoviePage;
