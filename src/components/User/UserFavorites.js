import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageListItem from '@mui/material/ImageListItem';
import { makeStyles } from '@mui/styles';
import noMovie from '../images/noMovie.jpg';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useSelector } from 'react-redux';

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
      'margin-bottom': '50px',
      'font-size': '1.5rem',
      'text-align': 'left',
      'padding-left': '1.2rem',
      'padding-top': '6rem',
    },
    divPadding: {
      paddingBottom: '50px',
    },
  };
});

const UserFavorites = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [userFavMovies, setUserFavMovies] = useState();
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  const currentUserId = useSelector((state) => state.userInfo.userId);

  // async function getUserData() {
  //   const documentRef = await doc(firestore, `/users/${currentUserId}`);
  //   const documentSnapshot = onSnapshot(documentRef, (doc) => {
  //     console.log('Current data: ', doc.data());
  //     setUserFavMovies(doc.data().favoriteMovies);
  //     setIsEmpty(false);
  //   });
  // }
  // getUserData();
  useEffect(() => {
    const documentRef = doc(firestore, `/users/${currentUserId}`);
    const documentSnapshot = onSnapshot(documentRef, (doc) => {
      console.log('Current data: ', doc.data());
      if (doc.data().favoriteMovies.length > 1) {
        setUserFavMovies(doc.data().favoriteMovies);
        setIsEmpty(false);
      }
    });
  }, [currentUserId]);

  return (
    <div>
      {!isEmpty && (
        <div>
          <h2 className={classes.header}>Favorite Movies</h2>
          <Slider {...settings} className={classes.root}>
            {userFavMovies.map((movie) => (
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
      )}

      {!isEmpty && (
        <div className={classes.divPadding}>
          <h2 className={classes.header}>Favorite TV Shows</h2>
          <Slider {...settings} className={classes.root}>
            {userFavMovies.map((movie) => (
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
      )}

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
    </div>
  );
};

export default UserFavorites;
