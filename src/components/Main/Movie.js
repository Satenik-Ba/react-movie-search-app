import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function Movie({ title, popularity, release_date, image }) {
  return (

      <ImageListItem key="Subheader"  sx={{ width: '15vw', height: 100 }} cols={8} >
        <ListSubheader component="div">{title}</ListSubheader>
        <img
          src={'https://image.tmdb.org/t/p/w500/' + image}
          alt=""
          loading="lazy"
        />
        <ImageListItemBar
          title='More info'
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about `}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
  );
}
