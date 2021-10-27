import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Carousel from './Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageListItem from '@mui/material/ImageListItem';
import noMovie from '../images/noMovie.jpg';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Movie from '../Main/Movie';
import { useDispatch } from 'react-redux';
import { favoriteMovieAction } from '../redux/FavoriteMovie';
const useStyles = makeStyles({
  root: {
    backgroundColor: '#232A3E',
    color: 'white',
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
    'padding-top': '5.5rem',
  },
  secondHeader: {
    color: 'white',
    'font-weight': 400,
    'font-size': '1.5rem',
    'text-align': 'left',
    'padding-left': '1.2rem',
    'padding-top': '1rem',
  },
  bottomMargin: {
    marginBottom: '1.5rem',
  },
});

function UserPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [favMovieIsEmpty, setFavMovieIsEmpty] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(2);
  const [userFavMovies, setUserFavMovies] = useState();
  const currentUserId = useSelector((state) => state.userInfo.userId);

  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: slidesToShow,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  useEffect(() => {
    const documentRef = doc(firestore, `/users/${currentUserId}`);
    onSnapshot(documentRef, (doc) => {
      if (doc.data().favoriteMovies.length >= 1) {
        setUserFavMovies(doc.data().favoriteMovies);
        setFavMovieIsEmpty(false);
      } else {
        setFavMovieIsEmpty(true);
      }
      if (doc.data().favoriteMovies.length >= 4) {
        setSlidesToShow(5);
      }
    });
  }, [currentUserId, dispatch]);
  return (
    <div className={classes.root}>
      <div>
        {!favMovieIsEmpty && (
          <div>
            <h2 className={classes.header}>Favorite Movies</h2>
            <Slider {...settings} className={classes.root}>
              {userFavMovies.map((movie) => (
                <Movie
                  movie={movie}
                  key={movie.id}
                  deleteIcon={movie.deleteIcon}
                />
              ))}
            </Slider>
          </div>
        )}
        {favMovieIsEmpty && (
          <div>
            <h1 className={classes.header}>Your Favorites List is Empty</h1>
            <ImageListItem
              sx={{
                width: '17vw !important',
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
      {favMovieIsEmpty && <Carousel />}
    </div>
  );
}

export default UserPage;
