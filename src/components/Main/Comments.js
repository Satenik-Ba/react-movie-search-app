import React, { useState, useEffect } from 'react';
import { SIGNIN_ROUTE } from '../../constants/routes';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { makeStyles } from '@mui/styles';
import { DialogContentText, DialogContent, Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Login from '../Authenticataion/Login';
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

const useStyles = makeStyles({
  rootBtn: {
    color: '#C52D3D !important',
    fontSize: '18px !important',
    border: '1px solid #C52D3D !important',
  },
  divComentUsers: {
    width: '80%',
    minHeight: '200px',
    border: '1px #222222 solid',
    textAlign: 'left',
    margin: 'auto',
    color: 'orange',
    lineHeight: '0px',
    fontWeight: 'bold',
  },
  comentValueUser: {
    fontWeight: 'bold',
    color: '#D1D2D6',
    minHeight: '20px',
    fontSize: '20px',
    lineHeight: '10px',
  },

  spanTime: {
    color: '#C52D3D',
    fontSize: '15px',
  },
});

export default function Comments({ movie1 }) {
  const classes = useStyles();
  const history = useHistory();
  const comentUserName = useSelector((state) => state.userInfo.userName);
  const comentUserId = useSelector((state) => state.userInfo.userId);
  const [commentValue, setCommentValue] = useState('');
  const [loadingComentPage, setLoadingComentPage] = useState();
  const [isEmpty, setIsEmpty] = useState(true);
  const timestamp = Date.now();
  const [open, setOpen] = useState(false);
  const newDataInComent = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(timestamp);

  const onHandleChange = (event) => {
    setCommentValue(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function onAddItem() {
    if (comentUserName !== '') {
      if (commentValue.trim() !== '') {
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
        alert('Please enter the text');
      }
    } else {
      history.push(SIGNIN_ROUTE);
    }

    setCommentValue('');
  }

  useEffect(() => {
    const commentsRef = doc(firestore, `/comments/${movie1.id}`);
    onSnapshot(commentsRef, (doc) => {
      if (doc.data().movieComments.length > 0) {
        setLoadingComentPage(doc.data().movieComments);
        setIsEmpty(false);
      }
    });
  }, [movie1.id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Item sx={{ backgroundColor: '#1F1F1F' }}>
            {!isEmpty && (
              <div className={classes.divComentUsers}>
                {loadingComentPage.map((comment) => (
                  <div>
                    <div className={classes.comentValueUser}>
                      <p style={{ lineHeight: '10px' }}>{comment.text} </p>
                      <span className={classes.spanTime} key={movie1.id}>
                        {comment.displayName} {'  '}
                        {comment.timeCreatedAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Item>
        </Grid>
        <Grid item md={6} xs={12}>
          <Item sx={{ backgroundColor: '#1F1F1F' }}>
            <TextareaAutosize
              value={commentValue}
              onChange={onHandleChange}
              maxRows={6}
              minRows={4}
              aria-label="maximum height"
              placeholder="Your Comment"
              style={{ width: 300 }}
            />
          </Item>
          <Item sx={{ backgroundColor: '#1F1F1F' }}>
            {comentUserName !== '' && (
              <Button
                onClick={onAddItem}
                className={classes.rootBtn}
                variant="text"
              >
                Send
              </Button>
            )}
            {comentUserName === '' && (
              <div>
                <Button
                  onClick={handleClickOpen}
                  className={classes.rootBtn}
                  variant="text"
                >
                  Send
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Please Login or Register to Add Movies/TV Shows to Your
                      Favorites List.
                    </DialogContentText>
                    <Login />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
