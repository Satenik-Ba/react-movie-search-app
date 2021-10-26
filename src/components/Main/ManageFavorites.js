import React,{useState} from 'react';
import FavoriteVideoIcon from './FavoriteVideoIcon';
import VideoDeleteIcon from './VideoDeleteIcon';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import { makeStyles } from '@mui/styles';
import { doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
// import { arrayUnion } from '@firebase/firestore';
import { useSelector } from 'react-redux';
// import { SIGNIN_ROUTE } from '../../constants/routes';
// import { useHistory } from 'react-router-dom';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// const useStyles = makeStyles({
//   icon: {
//     color: 'white ',
//   },
//   backgroundIcon: {
//     color: '#BF3B7C',
//   },
//   clearBackground: {
//     color: 'none',
//   },
// });

const ManageFavorites = ({ favMovie, deleteIcon }) => {
//   const classes = useStyles();
  const currentUserId = useSelector((state) => state.userInfo.userId);
//   const movie = useSelector((state) => state.SelectedMovie.selectedMovie);
//   //   const favMovies = useSelector((state) => state.FavoriteMovie.favMovies);
//   const [open, setOpen] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [favoriteMovieData, setFavoriteMovieData] = useState();
//   const [isDisabled, setIsDisabled] = useState();
//   const [isFavorite, setIsFavorite] = useState(false);
    const [favMovieData, setFavMovieData] = useState()
//   const history = useHistory();
//   const deleteIcon = (
//     <HighlightOffIcon
//       onClick={handleDeleteClick}
//       color="error"
//       fontSize="medium"
//     />
//   );
//   const favIcon = <Favorite className={classes.backgroundIcon} />;
//   let icon = favIcon; 
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//     setChecked(false);
//   };
//   const handleLogin = () => {
//     history.push(SIGNIN_ROUTE);
//   };

//   const handleClick = () => {
//     console.info('You clicked the Chip.');
//   };

   function getData() {
    const userRef = doc(firestore, 'users', currentUserId);
     onSnapshot(userRef, (doc) => {
      console.log(doc.data().favoriteMovies);
    //   let data = doc.data().favoriteMovies;
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].isFavorite === true && data[i].id === favMovie.id) {
    //       console.log('IS FAVORITE IS TRUE');
    //       setIsFavorite(true);
    //     }
    //   }
    });
  }
//   const handleDeleteClick = () => {
//     setIsDisabled(true);
//     getData();
//   };

//   async function handleFavoriteClick() {
//     const userRef = doc(firestore, 'users', currentUserId);
//     favMovie.isFavorite = true;
//     favMovie.deleteIcon = deleteIcon;
//     await updateDoc(userRef, {
//       favoriteMovies: arrayUnion(favMovie),
//     });
//     // setIsFavorite(true)
//     // icon = deleteIcon
//     // getData();
//   }

  
  return (
    <div>
        {deleteIcon ? <VideoDeleteIcon favMovie={favMovie} /> : <FavoriteVideoIcon favMovie={favMovie}/>}
    </div>
  );
};

export default ManageFavorites;
