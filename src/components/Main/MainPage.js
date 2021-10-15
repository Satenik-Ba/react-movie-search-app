import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { POPULAR_MOVIES_API } from "../../constants/APIs";
import CarouselFilms from "./CarouselFilms";
import { makeStyles } from "@mui/styles";
import { selectedId } from "../Header/CategoryFilms";

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
  const [selectCategory, setSelectCategory] = useState(categoryId);
  useEffect(() => {
    fetch(POPULAR_MOVIES_API)
      .then((response) => response.json())
      .then((result) => {
        setFeaturedMovies(result.results);
      });
  }, []);
  console.log(selectedId);
  console.log(selectCategory);
  return (
    <div className={classes.root}>
      <div>
        <CarouselFilms />
      </div>
      <h2 className={classes.root}>Featured Movies</h2>
      {selectCategory
        ? featuredMovies
            .filter((featuredMovie) =>
              featuredMovie.genre_ids.includes(selectCategory)
            )
            .map((movie) => (
              <Movie
                key={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                // overview={movie.overview}
                image={movie.poster_path}
              />
            ))
        : featuredMovies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              // overview={movie.overview}
              image={movie.poster_path}
            />
          ))}
    </div>
  );
}

export default MainPage;
