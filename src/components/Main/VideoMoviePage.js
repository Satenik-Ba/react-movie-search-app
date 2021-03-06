import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import Comments from './Comments';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: 'none',
  color: theme.palette.text.secondary,
}));

const opts = {
  width: '100%',
  playerVars: {
    autoplay: 0,
  },
};
const useStyles = makeStyles({
  imgWidth: {
    height: '320px',
  },
  root: {
    backgroundColor: '#1F1F1F',
    padding: '1rem',
  },
  heading: {
    color: '#D1D2D6',
  },
});

const VideoMoviePage = () => {
  const classes = useStyles();
  const [movieKey, setMovieKey] = useState();
  const [cast, setCast] = useState([]);
  const movieOrTV = useSelector((state) => state.movieOrTV.movieOrTV);
  const movie = JSON.parse(localStorage.getItem('movieStore'));

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/' +
        `${movieOrTV}` +
        '/' +
        `${movie.id}` +
        '/videos?api_key=6241e31f828487ad21497bc364be7041'
    )
      .then((response) => response.json())
      .then((result) => {
        setMovieKey(result.results[0]);
      })
      .catch((err) => console.log(err.name));

    fetch(
      'https://api.themoviedb.org/3/' +
        `${movieOrTV}` +
        '/' +
        `${movie.id}` +
        '/credits?api_key=6241e31f828487ad21497bc364be7041&language=en-US'
    )
      .then((response) => response.json())
      .then((result) => {
        setCast(result.cast.concat(result.crew));
      })
      .catch((err) => console.log(err.name));
  }, [movie.id, movieOrTV]);

  const acters = cast.filter(
    (person) => person.known_for_department === 'Acting'
  );
  const director = cast.filter(
    (person) => person.known_for_department === 'Directing'
  );

  return (
    <div className={classes.root}>
      <Box sx={{ flexGrow: 1, paddingTop: '90px' }}>
        <h2 className={classes.heading}> {movie.title}</h2>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Item sx={{ backgroundColor: '#1F1F1F' }}>
              {movieKey && <YouTube videoId={movieKey.key} opts={opts} />}
            </Item>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              underline: 'none !important',
            }}
          >
            <Item
              sx={{
                backgroundColor: '#1F1F1F',
                color: '#D1D2D6',
              }}
            >
              {movieOrTV === 'movie' && (
                <h4>
                  Director(s):
                  {director.map((director) => (
                    <span> {director.name}</span>
                  ))}
                </h4>
              )}

              <h4>
                Movie Overview: <p>{movie.overview}</p>
              </h4>
              <h4>
                Actors:
                <p>
                  {acters.map((acter) => (
                    <span> {acter.name},</span>
                  ))}
                </p>
              </h4>
              {movieOrTV === 'movie' && (
                <h4>Release Date: {movie.release_date}</h4>
              )}
            </Item>
          </Grid>
        </Grid>
        <h2 className={classes.heading}>User Comments</h2>
        <Comments movie1={movie} />
      </Box>
    </div>
  );
};
export default VideoMoviePage;
