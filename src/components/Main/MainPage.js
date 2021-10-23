import React, { useEffect, useMemo, useState } from "react";
import Movie from "./Movie";
import CarouselFilms from "./CarouselFilms";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import PaginationMain from "./PaginationMain";

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
  const loadingURL = useSelector((state) => state.loadingURL.loadingURL);
  const catVal = useSelector((state) => state.categoryValue.catValue);
  const pagValue = useSelector((state) => state.pageValue.pagValue);

  const searchedName = useSelector(
    (state) => state.searchName.searchValue || ""
  );

  const [filtredMovies, setFiltredMovies] = useState([]);

  const filmResult = useMemo(() => {
    return catVal
      ? filtredMovies.filter((featuredMovie) =>
          featuredMovie.genre_ids.includes(+catVal)
        )
      : filtredMovies;
  }, [catVal, filtredMovies, featuredMovies]);
  useEffect(() => {
    fetch(loadingURL + pagValue)
      .then((response) => response.json())
      .then((result) => {
        setFeaturedMovies(result.results);
      });
  }, [loadingURL, pagValue]);

  useEffect(() => {
    setFiltredMovies(
      featuredMovies.filter((featuredMovie) =>
        (featuredMovie.title || featuredMovie.name)
          .toUpperCase()
          .includes(searchedName.toUpperCase().trim())
      )
    );
  }, [searchedName, featuredMovies]);

  // console.log("serchName " + searchedName);

  return (
    <div className={classes.root}>
      <div>
        <CarouselFilms />
      </div>
      <h2 className={classes.root}>Featured Movies</h2>

      {filmResult.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
      <PaginationMain />
    </div>
  );
}

export default MainPage;
