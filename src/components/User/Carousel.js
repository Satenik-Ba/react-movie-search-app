import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { POPULAR_MOVIES_API } from '../../constants/APIs';
import { POPULAR_TV_SHOWS_API } from '../../constants/APIs';
import ImageListItem from '@mui/material/ImageListItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => {
  return {
    root: {
      '& button:before': {
        color: 'white !important',
      },
      cursor: 'pointer',
      width: '98%',
    },
    header: {
      color: 'white',
      'font-weight': 400,
      'font-size': '1.5rem',
      'text-align': 'left',
      'padding-left': '1.2rem',
    },
    divPadding: {
      paddingBottom: '100px',
    },
  };
});

const Carousel = () => {
  const classes = useStyles();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);

  useEffect(() => {
    fetch(POPULAR_MOVIES_API+1)
      .then((response) => response.json())
      .then((result) => {
        setPopularMovies(result.results);
      });
  }, []);
  useEffect(() => {
    fetch(POPULAR_TV_SHOWS_API)
      .then((response) => response.json())
      .then((result) => {
        setPopularTvShows(result.results);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: false,
  };

  return (
    <div className={classes.divPadding}>
      <h2 className={classes.header}>Explore Popular Movies</h2>
      <Slider {...settings} className={classes.root}>
        {popularMovies.map((movie) => (
          <ImageListItem
            key={movie.id}
            sx={{
              width: '14rem !important',
              height: '18rem !important',
              padding: '1px !important',
              lineHeight: '1.3 !important',
            }}
          >
            <img
              src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
              alt=""
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </Slider>

      <h2 className={classes.header}>Explore Popular TV Shows</h2>
      <Slider {...settings} className={classes.root}>
        {popularTvShows.map((movie) => (
          <ImageListItem
            key={movie.id}
            sx={{
              width: '14rem !important',
              height: '18rem !important',
              padding: '1px !important',
              lineHeight: '1.3 !important',
            }}
          >
            <img
              src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
              alt=""
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
