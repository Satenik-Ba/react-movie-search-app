import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteVideoIcon from './FavoriteVideoIcon';
import ReitingVideoStars from './ReitingVideoStars';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
const useStyles = makeStyles({
  root: {
    color: 'red',
    width: '100vw',
    height: '100vh',
    color: 'white',
    'background-color': '#232A3E',
    'margin-top': '7rem',
  },
});

const VideoMoviePage = ({ id }) => {
  const classes = useStyles();
  const movie = useSelector(
    (state) => state.SelectedMovie.selectedMovie.selectedMovie
  );

  console.log(movie, 'VIDEO MOVIE PAGE ');
  return (
    <div className={classes.root}>
      <h4>Movie Title: {movie.title}</h4>
      <h4>Movie Overview: {movie.overview}</h4>
      <h4>Release Date: {movie.release_date}</h4>
      <ImageListItem
        sx={{
          width: '20vw',
          height: 100,
          padding: '5px',
          lineHeight: '1.3 !important',
          cursor: 'pointer',
        }}
        cols={8}
      >
        <ReitingVideoStars />
        <div className={classes.text}>{movie.overview}</div>
        <img
          src={'https://image.tmdb.org/t/p/w500/' + `${movie.poster_path}`}
          alt=""
          loading="lazy"
        />
        <ImageListItemBar
          // title={title}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.94)' }}
              aria-label={`info abou`}
            >
              <FavoriteVideoIcon />
              <PlayCircleOutlineIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </div>
  );
};
export default VideoMoviePage;
