import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Movie from "./Movie";
import { POPULAR_TV_SHOWS_API } from "../../constants/APIs";
import CarouselFilms from "./CarouselFilms";
import { makeStyles } from "@mui/styles";

import PaginationMainTvShows from "./PaginationMainTvShows";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#232A3E",
      color: "#D1D2D6",
      paddingBottom: "40px",
    },
  };
});

function MainPage_TV_Show() {
  const classes = useStyles();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const catVal = useSelector((state) => state.categoryValue.catValue.catValue);
  const searchedName = useSelector(
    (state) => state.searchName.searchValue.searchValue || ""
  );
  const [filtredMovies, setFiltredMovies] = useState([]);

  const pagTvShowVal = useSelector(
    (state) => state.pageTvShows.pagTvShows.pagTvShows
  );
  console.log("pagtvshows " + pagTvShowVal);

  // useSelector((state) => state.pageValue.pagValue.pagValue);
  useEffect(() => {
    fetch(POPULAR_TV_SHOWS_API + pagTvShowVal)
      .then((response) => response.json())
      .then((result) => {
        setFeaturedMovies(result.results);
      });
  }, [pagTvShowVal]);

  useEffect(() => {
    setFiltredMovies(
      featuredMovies.filter((featuredMovie) =>
        featuredMovie.name
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
      <h2 className={classes.root}>Popular TV Shows</h2>

      {catVal
        ? filtredMovies
            .filter((featuredMovie) =>
              featuredMovie.genre_ids.includes(+catVal)
            )
            .map((movie) => <Movie id={movie.id} movie={movie} />)
        : filtredMovies.map((movie) => <Movie id={movie.id} movie={movie} />)}
      <PaginationMainTvShows />
    </div>
  );
}

export default MainPage_TV_Show;
