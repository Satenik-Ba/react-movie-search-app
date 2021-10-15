import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { POPULAR_MOVIES_API } from "../../constants/APIs";
import CarouselFilms from "./CarouselFilms";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#232A3E",
      color: "#D1D2D6",
      paddingBottom: "40px",
    },
  };
});

function MainPage() {
  const classes = useStyles();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  useEffect(() => {
    fetch(POPULAR_MOVIES_API)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "Movie RESULT");
        setFeaturedMovies(result.results);
      });
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <CarouselFilms />
      </div>
      <h2 className={classes.root}>Featured Movies</h2>
      {featuredMovies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          release_date={movie.release_date}
          overview={movie.overview}
          image={movie.poster_path}
        />
      ))}
    </div>
  );
}

export default MainPage;
