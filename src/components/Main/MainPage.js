import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { POPULAR_MOVIES_API } from '../../constants/APIs';
import { PagValueAction } from '../redux/pageValue';
import Movie from './Movie';
import PaginationMain from './PaginationMain';
import Movie_TV_Shows from '../Header/Movie_TV_Shows';
import CategoryFilms from '../Header/CategoryFilms';
import {primaryBackgroundColor} from '../../constants/constants';
const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: primaryBackgroundColor,
      color: '#D1D2D6',
      paddingTop: '1rem',
    },
    disFlex: {
      display: 'flex',
      marginTop: '4rem',
      justifyContent: 'center',
    },
  };
});

function MainPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [searchedItem, setSearchedItem] = useState();

  const loadingURL = useSelector((state) => state.loadingURL.loadingURL);
  const catVal = useSelector((state) => state.categoryValue.catValue);
  const pagValue = useSelector((state) => state.pageValue.pagValue);
  const searchedName = useSelector((state) => state.searchName.searchValue);

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
    if (searchedName) {
      fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=6241e31f828487ad21497bc364be7041&language=en-US&query=' +
          `${searchedName}` +
          '&include_adult=false'
      )
        .then((response) => response.json())
        .then((result) => {
          setSearchedItem(result.results);
        })
        .catch((err) => console.log(err.name));
    }
  }, [searchedName]);

  useEffect(() => {
    setFiltredMovies(
      featuredMovies.filter((featuredMovie) =>
        (featuredMovie.title || featuredMovie.name).toUpperCase()
      )
    );
  }, [featuredMovies]);

  useEffect(() => {
    dispatch(
      PagValueAction.changeValue({
        pagValue: 1,
      })
    );
  }, [loadingURL, dispatch]);

  return (
    <div className={classes.root}>
      {searchedName ? (
        <h2 className={classes.disFlex}>Search Results for: {searchedName}</h2>
      ) : (
        <span className={classes.disFlex}>
          <Movie_TV_Shows />
          <CategoryFilms />
        </span>
      )}

      {loadingURL === POPULAR_MOVIES_API ? (
        <span>
          <h2>Featured Movies</h2>
        </span>
      ) : (
        <span>
          <h2>Featured TV Shows</h2>
        </span>
      )}

      {searchedItem && searchedName
        ? searchedItem.map((item) => (
            <Movie
              key={item.id}
              movie={item}
              defaultValue={item.vote_average}
            />
          ))
        : filmResult.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              defaultValue={movie.vote_average}
            />
          ))}

      {/* {filmResult.map((movie) => (
        <Movie key={movie.id} movie={movie} defaultValue={movie.vote_average} />
      ))} */}
      <PaginationMain />
    </div>
  );
}

export default MainPage;
