import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { POPULAR_MOVIES_API } from "../../constants/APIs";
import { POPULAR_TV_SHOWS_API } from "../../constants/APIs";
import { makeStyles } from "@mui/styles";
import Movie from "../Main/Movie";
import { imgSrc } from "../../constants/constants";

const useStyles = makeStyles(() => {
  return {
    root: {
      "& button:before": {
        color: "white !important",
      },
      cursor: "pointer",
      width: "98%",
    },
    header: {
      color: "white",
      "font-weight": 400,
      "font-size": "1.5rem",
      "text-align": "left",
      "padding-left": "1.2rem",
      "padding-top": "1rem",
    },
  };
});

const Carousel = () => {
  const classes = useStyles();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);

  useEffect(() => {
    fetch(POPULAR_MOVIES_API)
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
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div>
      <h2 className={classes.header}>Explore Popular Movies</h2>
      <Slider {...settings} className={classes.root}>
        {popularMovies.map((movie) => (
          <Movie movie={movie} key={movie.id}>
            <img
              src={imgSrc + movie.poster_path}
              alt="movie poster"
              loading="lazy"
            />
          </Movie>
        ))}
      </Slider>

      <h2 className={classes.header}>Explore Popular TV Shows</h2>
      <Slider {...settings} className={classes.root}>
        {popularTvShows.map((movie) => (
          <Movie movie={movie} key={movie.id}>
            <img
              src={imgSrc + movie.poster_path}
              alt="movie poster"
              loading="lazy"
            />
          </Movie>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
