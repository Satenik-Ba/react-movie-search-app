import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  doc,
  arrayRemove,
  updateDoc,
  // deleteField,
  // getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";

const VideoDeleteIcon = (favMovie) => {
  const currentUserId = useSelector((state) => state.userInfo.userId);

  // useEffect(() => {
  //   const documentRef = doc(firestore, `/users/${currentUserId}`);
  //   onSnapshot(documentRef, (doc) => {
  //     let data = doc.data().favoriteMovies
  //     for (let i = 0; i < data.length; i++ ){
  //         if(Object.values(data).includes(favMovie.id)){
  //           updateDoc(documentRef, {
  //             favoriteMovies: arrayRemove(data[i]),
  //           });
  //         }
  //     }
  //   });
  // }, [currentUserId]);

  async function handleClick() {
    const documentRef = doc(firestore, `/users/${currentUserId}`);
    onSnapshot(documentRef, (doc) => {
      let data = doc.data().favoriteMovies;
      for (let i = 0; i < data.length; i++) {
        if (Object.values(data[i]).includes(favMovie.id)) {
          updateDoc(documentRef, {
            favoriteMovies: arrayRemove(data[i]),
          });
        }
      }
    });
    console.info("You clicked the Chip.");
  }

  return (
    <HighlightOffIcon onClick={handleClick} color="error" fontSize="medium" />
  );
};

export default VideoDeleteIcon;
