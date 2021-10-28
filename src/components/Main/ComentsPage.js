import React, { useState, useEffect } from "react";
import { SIGNIN_ROUTE } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { arrayUnion } from "@firebase/firestore";
import firebase from "../../firebase";

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
  spanTime: {
    marginLeft: "20px",
    color: "#C52D3D",
    fontSize: "15px",
  },
});

export default function ComentsPage({ movie1 }) {
  const classes = useStyles();
  const history = useHistory();
  const comentUserName = useSelector((state) => state.userInfo.userName);
  const comentUserId = useSelector((state) => state.userInfo.userId);
  const [commentValue, setCommentValue] = useState("");
  const [loadingComentPage, setLoadingComentPage] = useState();
  const [isEmpty, setIsEmpty] = useState(true);
  const timestamp = Date.now();
  const newDataInComent = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);

  const onHandleChange = (event) => {
    setCommentValue(event.target.value);
  };

  async function onAddItem() {
    if (comentUserName !== "") {
      if (commentValue.trim() !== "") {
        const commentsRef = doc(firestore, `/comments/${movie1.id}`);
        await updateDoc(commentsRef, {
          movieComments: arrayUnion({
            displayName: comentUserName,
            uId: comentUserId,
            text: commentValue,
            timeCreatedAt: newDataInComent,
          }),
        });
      } else {
        alert("Please enter the text");
      }
    } else {
      history.push(SIGNIN_ROUTE);
    }

    setCommentValue("");
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

  // console.log(loadingComentPage);

  return (
    <div>
      <div>Coment Page</div>
      {!isEmpty && (
        <div className={classes.divComentUsers}>
          {loadingComentPage.map((comment) => (
            <div>
              <p>{comment.displayName}</p>
              <p className={classes.comentValueUser}>
                {comment.text}
                <span className={classes.spanTime}>
                  {comment.timeCreatedAt}
                </span>
              </p>
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
        style={{ width: 400 }}
      />
      <Button onClick={onAddItem} className={classes.rootBtn} variant="text">
        Send
      </Button>
    </div>
  );
}
