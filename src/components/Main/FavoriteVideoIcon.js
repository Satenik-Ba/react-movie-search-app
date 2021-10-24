import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { makeStyles } from '@mui/styles';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { arrayUnion } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import SelectedMovie from '../redux/SelectedMovie';
import { collection, setDoc } from 'firebase/firestore';
const useStyles = makeStyles({
  icon: {
    color: 'white ',
  },
  backgroundIcon: {
    color: '#BF3B7C',
  },
});

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FavoriteVideoIcon({favMovie}) {
  const classes = useStyles();
  const currentUserId = useSelector((state) => state.userInfo.userId);
  const movie = useSelector((state) => state.SelectedMovie.selectedMovie);

  async function onFavoriteVideoByUser() {
    const userRef = doc(firestore, 'users', currentUserId);
    await updateDoc(userRef, {
      favoriteMovies: arrayUnion(favMovie),
    });
  }

  return (
    <div>
      <Checkbox
        {...label}
        onClick={onFavoriteVideoByUser}
        icon={<FavoriteBorder className={classes.icon} />}
        checkedIcon={<Favorite className={classes.backgroundIcon} />}
        id={SelectedMovie.id}
      />
    </div>
  );
}
