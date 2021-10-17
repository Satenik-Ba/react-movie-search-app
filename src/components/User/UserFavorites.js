import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageListItem from '@mui/material/ImageListItem';
import { makeStyles } from '@mui/styles';
import noMovie from '../images/noMovie.jpg';
const useStyles = makeStyles(() => {
  return {
    root: {
      '& button:before': {
        color: 'white !important',
      },
      cursor: 'pointer',
    },
    header: {
      color: 'white',
      'font-weight': 400,
      'font-size': '1.5rem',
      'text-align': 'left',
      'padding-left': '1.2rem',
      'padding-top': '6rem'
    },
  };
});

const UserFavorites = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <div>
      {!isEmpty && <h2 className={classes.header}>Favorites</h2>}
      {isEmpty && (
        <div>
          <h1 className={classes.header}>Your Favorites List is Empty</h1>
          <ImageListItem
            sx={{
              width: '14rem !important',
              height: '18rem !important',
              padding: '1px !important',
              lineHeight: '1.3 !important',
            }}
          >
            <img src={noMovie} alt="empty movie poster" loading="lazy" />
          </ImageListItem>
        </div>
      )}
      <Slider {...settings} className={classes.root}></Slider>
    </div>
  );
};

export default UserFavorites;
