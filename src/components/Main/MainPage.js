import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { TRENDING_MOVIES_API } from "../../constants/APIs";
import CarouselFilms from "./CarouselFilms";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import VideoMoviePage from "./VideoMoviePage";

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
    fetch(TRENDING_MOVIES_API)
      .then((response) => response.json())
      .then((result) => {
        setFeaturedMovies(result.results);
      });
  }, []);
  const catVal = useSelector((state) => state.categoryValue.catValue.catValue);
  const videoIdMain = useSelector((state) => state.videoPageId.videoId.videoId);

  console.log(videoIdMain);
  if (videoIdMain) {
    return (
      <div>
        <div>{videoIdMain}</div>
        <div>{videoIdMain}</div>
        <div>{videoIdMain}</div>
        <div>{videoIdMain}</div>
        <div>{videoIdMain}</div>
        <div>{videoIdMain}</div>
        <div>{videoIdMain}</div>
        <div>{videoIdMain}</div>
        <div>{videoIdMain}</div>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <div>
          <CarouselFilms />
        </div>
        <h2 className={classes.root}>Featured Movies</h2>

        {catVal
          ? featuredMovies
              .filter((featuredMovie) =>
                featuredMovie.genre_ids.includes(+catVal)
              )
              .map((movie) => (
                <Movie
                  id={movie.id}
                  title={movie.title}
                  release_date={movie.release_date}
                  overview={movie.overview}
                  image={movie.poster_path}
                />
              ))
          : featuredMovies.map((movie) => (
              <Movie
                id={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                overview={movie.overview}
                image={movie.poster_path}
              />
            ))}
      </div>
    );
  }
}

export default MainPage;
