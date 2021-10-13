import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'yellow',
  },
});

const Movie = ({ title, release_date, image, overview }) => {
  const onInfoClick = () => {
    console.log('info click');
  };
  const classes = useStyles();
  return (
    <ImageListItem
      sx={{ width: '15vw', height: 100 }}
      cols={8}
      className={classes.root}
    >
      <img
        src={'https://image.tmdb.org/t/p/w500/' + image}
        alt=""
        loading="lazy"
      />
      <ImageListItemBar
        title={title}
        actionIcon={
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.94)' }}
            aria-label={`info abou`}
            onClick={onInfoClick}
          >
            <InfoIcon />
          </IconButton>
        }
      />
      <p>{overview}</p>
    </ImageListItem>
  );
};

export default Movie;
