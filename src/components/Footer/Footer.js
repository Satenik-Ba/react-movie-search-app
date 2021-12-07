import React from 'react';
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CopyrightIcon from '@mui/icons-material/Copyright';

const useStyles = makeStyles(() => {
  return {
    root: {
      justifyContent: 'space-between',
      width: '100%',
      height: '50',
      margin: 'auto',
      padding: '20px',
      paddingTop: '30px !important',
      paddingBottom: '0.5rem !important',
      color: 'grey',
      '&:hover': {
        color: 'white',
        cursor: 'pointer',
      },
    },
    button: {
      fontSize: '16px',
      background: 'none',
      border: 'none',
      margin: 15,
      padding: 0,
      paddingBottom: 15,
      color: 'grey',
      '&:hover': {
        color: 'white',
        cursor: 'pointer',
      },
    },
    href: {
      fontSize: '16px',
      background: '#323332',
      border: 'none',
      margin: 15,
      padding: 10,
      paddingBottom: 15,
      color: 'grey',
      '&:hover': {
        color: 'white',
        cursor: 'pointer',
      },
    },
    movieDBLogo: {
      fontSize: '16px',
      background: '#323332',
      border: 'none',
      margin: 15,
      padding: 10,
      paddingBottom: 15,
      filter:
        'invert(58%) sepia(96%) saturate(5147%) hue-rotate(3deg) brightness(94%) contrast(101%)',
    },
    copyright: {
      color: 'grey',
      paddingBottom: '1.5rem',
    },
  };
});

function Footer() {
  const classes = useStyles();

  return (
    <div>
      <Grid>
        <FacebookIcon className={classes.root} />
        <InstagramIcon className={classes.root} />
        <GoogleIcon className={classes.root} />
        <TwitterIcon className={classes.root} />
        <YouTubeIcon className={classes.root} />
      </Grid>
      <br />
      <Grid>
        <Link href="https://www.apple.com/">
          <button className={classes.href} variant="contained">
            App Store
          </button>
        </Link>
        <Link href="https://play.google.com/">
          <button className={classes.href} variant="contained">
            Google PLay
          </button>
        </Link>
        <Link href="https://www.themoviedb.org/documentation/api">
          <button className={classes.href} variant="contained">
            MovieDB API
          </button>
        </Link>
      </Grid>
      <span className={classes.copyright}>
        <CopyrightIcon /> This product uses the TMDB API but is not endorsed or
        certified by TMDB.
      </span>
    </div>
  );
}

export default Footer;
