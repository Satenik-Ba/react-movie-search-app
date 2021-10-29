import React from 'react';
import FavoriteVideoIcon from './FavoriteVideoIcon';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase';

const ManageFavorites = ({ favMovie, deleteIcon }) => {
  const currentUserId = useSelector((state) => state.userInfo.userId);

  async function handleClick() {
    const documentRef = doc(firestore, `/users/${currentUserId}`);
    onSnapshot(documentRef, (doc) => {
      let data = doc.data().favoriteMovies;
      let filteredData = data.filter((movie) => movie.id !== favMovie.id);
      updateDoc(documentRef, {
        favoriteMovies: filteredData,
      });
    });
  }

  return (
    <div>
      {deleteIcon ? (
        <HighlightOffIcon
          onClick={handleClick}
          color="error"
          fontSize="medium"
        />
      ) : (
        <FavoriteVideoIcon favMovie={favMovie} />
      )}
    </div>
  );
};

export default ManageFavorites;
