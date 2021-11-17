import React, { useEffect, useMemo, useState } from "react";
import Movie from "./Movie";
import CarouselFilms from "./CarouselFilms";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import PaginationMain from "./PaginationMain";
import { POPULAR_MOVIES_API } from "../../constants/APIs";
import { PagValueAction } from "../redux/pageValue";
import Movie_TV_Shows from "../Header/Movie_TV_Shows";
import CategoryFilms from "../Header/CategoryFilms";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#1F1F1F",
      color: "#D1D2D6",
      paddingTop: "50px",
    },
    disFlex: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

function MainPage() {
  const classes = useStyles();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const loadingURL = useSelector((state) => state.loadingURL.loadingURL);
  const catVal = useSelector((state) => state.categoryValue.catValue);
  const pagValue = useSelector((state) => state.pageValue.pagValue);
  const dispatch = useDispatch();

  const searchedName = useSelector(
    (state) => state.searchName.searchValue || ''
  );

  const [filtredMovies, setFiltredMovies] = useState([]);

  const filmResult = useMemo(() => {
    return catVal
      ? filtredMovies.filter((featuredMovie) =>
          featuredMovie.genre_ids.includes(+catVal)
        )
      : filtredMovies;
  }, [catVal, filtredMovies]);
  useEffect(() => {
    fetch(loadingURL + pagValue)
      .then((response) => response.json())
      .then((result) => {
        setFeaturedMovies(result.results);
      })
      .catch((err) => console.log(err.name));
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

  useEffect(() => {
    dispatch(
      PagValueAction.changeValue({
        pagValue: 1,
      })
    );
  }, [loadingURL, dispatch]);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
      </div>
      <div>
        <CarouselFilms />
      </div>

      {loadingURL === POPULAR_MOVIES_API ? (
        <>
          <h2 className={classes.root}>Featured Movies</h2>
          <div className={classes.disFlex}>
            <Movie_TV_Shows />
            <CategoryFilms />
          </div>
        </>
      ) : (
        <>
          <h2 className={classes.root}>Featured TV Shows</h2>
          <div className={classes.disFlex}>
            <Movie_TV_Shows />
            <CategoryFilms />
          </div>
        </>
      )}

      {filmResult.map((movie) => (
        <Movie key={movie.id} movie={movie} defaultValue={movie.vote_average} />
      ))}
      <PaginationMain />
    </div>
  );
}

export default MainPage;
