import ComentsPage from "./ComentsPage";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import { imgSrc } from "../../constants/constants";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const opts = {
  width: "100%",

  playerVars: {
    autoplay: 0,
  },
};
const useStyles = makeStyles({
  imgWidth: {
    height: "320px",
  },
  root: {
    backgroundColor: "#1F1F1F",
  },
});
const VideoMoviePage = () => {
  const classes = useStyles();
  const [movieKey, setMovieKey] = useState();
  const [persons, setPersons] = useState([]);
  const movieOrTV = useSelector((state) => state.movieOrTV.movieOrTV);
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
  }, [movie.id]);
  const acters = persons.filter(
    (person) => person.known_for_department === "Acting"
  );
  const directors = persons.filter(
    (person) => person.known_for_department === "Directing"
  );

  return (
    <div className={classes.root}>
      <Box sx={{ flexGrow: 1, paddingTop: "90px" }}>
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Item sx={{ backgroundColor: "#1F1F1F" }}>
              <img
                className={classes.imgWidth}
                src={imgSrc + `${movie.poster_path}`}
                alt="movie poster"
                loading="lazy"
              />
            </Item>
          </Grid>
          <Grid item md={9} xs={12}>
            <Item sx={{ backgroundColor: "#1F1F1F", color: "#D1D2D6" }}>
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
            </Item>
          </Grid>
          <Grid item md={3} xs={0}></Grid>
          <Grid item md={6} xs={12}>
            <Item sx={{ backgroundColor: "#1F1F1F" }}>
              {movieKey && <YouTube videoId={movieKey.key} opts={opts} />}
            </Item>
          </Grid>
          <Grid item md={3} xs={0}></Grid>
        </Grid>
        <ComentsPage movie1={movie} />
      </Box>
    </div>
  );
};
export default VideoMoviePage;
