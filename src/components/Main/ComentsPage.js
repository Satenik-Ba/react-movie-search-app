import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { arrayUnion } from "@firebase/firestore";

const useStyles = makeStyles({
  rootBtn: {
    marginBottom: "4% !important",
    color: "#C52D3D !important",
    fontSize: "20px !important",
  },
  divComentUsers: {
    width: "80%",
    minHeight: "200px",
    border: "1px black solid",
    textAlign: "left",
    margin: "auto",
    color: "orange",
    lineHeight: "0px",
    fontWeight: "bold",
  },
  comentValueUser: {
    fontWeight: "bold",
    color: "white",

    minHeight: "20px",
    fontSize: "20px",
  },
  emptyComment: {
    marginLeft: "22%",
    fontSize: "30px",
  },
});

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ComentsPage({ movie1 }) {
  const classes = useStyles();
  const history = useHistory();
  const comentUserName = useSelector((state) => state.userInfo.userName);
  const comentUserId = useSelector((state) => state.userInfo.userId);
  const [commentValue, setCommentValue] = useState("");
  const [loadingComentPage, setLoadingComentPage] = useState();
  const [isEmpty, setIsEmpty] = useState(true);

  const onHandleChange = (event) => {
    setCommentValue(event.target.value);
  };

  async function onAddItem() {
    const commentsRef = doc(firestore, `/comments/${movie1.id}`);
    await updateDoc(commentsRef, {
      movieComments: arrayUnion(commentValue),
    });
    setCommentValue("");

    // const documentSnapshot = onSnapshot(commentsRef, (doc) => {
    //   // console.log(doc.data().movieComments);

    //   setLoading(loading.concat(doc.data().movieComments));

    //   // console.log("loading " + loading);
    //   // console.log(doc.data().movieComments.length);
    // });
  }

  useEffect(() => {
    const commentsRef = doc(firestore, `/comments/${movie1.id}`);
    const documentSnapshot = onSnapshot(commentsRef, (doc) => {
      if (doc.data().movieComments.length > 0) {
        setLoadingComentPage(doc.data().movieComments);
        setIsEmpty(false);
      }
    });
  }, [movie1.id]);

  console.log(loadingComentPage);

  return (
    <div>
      <div>Coment Page</div>
      {!isEmpty && (
        <div className={classes.divComentUsers}>
          {loadingComentPage.map((comment) => (
            <div>
              <p>{comentUserName}</p>
              <p className={classes.comentValueUser}>{comment}</p>
            </div>
          ))}
        </div>
      )}
      {isEmpty && (
        <div className={classes.divComentUsers}>
          <p className={classes.emptyComment}>
            No one has commented on this movie yet
          </p>
        </div>
      )}

      <TextareaAutosize
        value={commentValue}
        onChange={onHandleChange}
        maxRows={4}
        minRows={4}
        aria-label="maximum height"
        placeholder="Your Comment"
        // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        //   ut labore et dolore magna aliqua."
        style={{ width: 400 }}
      />
      <Button onClick={onAddItem} className={classes.rootBtn} variant="text">
        Send
      </Button>
    </div>
  );
}
