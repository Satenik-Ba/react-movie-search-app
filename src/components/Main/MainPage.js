import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { TRENDING_MOVIES_API } from "../../constants/APIs";
import CarouselFilms from "./CarouselFilms";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { POPULAR_MOVIES_API } from "../../constants/APIs";

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

  const catVal = useSelector((state) => state.categoryValue.catValue.catValue);
  const searchedName = useSelector(
    (state) => state.searchName.searchValue.searchValue || ""
  );
  const [filtredMovies, setFiltredMovies] = useState([]);
  useEffect(() => {
    fetch(POPULAR_MOVIES_API + "" + 2)
      .then((response) => response.json())
      .then((result) => {
        setFeaturedMovies(result.results);
      });
  }, []);

  useEffect(() => {
    setFiltredMovies(
      featuredMovies.filter((featuredMovie) =>
        featuredMovie.title
          .toUpperCase()
          .includes(searchedName.toUpperCase().trim())
      )
    );
  }, [searchedName, featuredMovies]);

  return (
    <div className={classes.root}>
      <div>
        <CarouselFilms />
      </div>
      <h2 className={classes.root}>Featured Movies</h2>

      {catVal
        ? filtredMovies
            .filter((featuredMovie) =>
              featuredMovie.genre_ids.includes(+catVal)
            )
            .map((movie) => <Movie key={movie.id} movie={movie} />)
        : featuredMovies.map((movie) => <Movie key={movie.id} movie={movie} />)}
    </div>
  );
}

export default MainPage;
