import React, { useRef, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routes";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    "margin-top": "auto",
    "margin-bottom": "auto",
  },
  button: {
    backgroundColor: "#171c2c",
    alignSelf: "center",
    width: "25rem",
    fontSize: "1.2rem",
    color: "white",
    height: "3.6rem",
    "&:hover": {
      backgroundColor: "#7b84a4",
    },
  },
  heading: {

    color: '#171c2c',
    fontWeight: 600,
  },
});

const Register = () => {
  const classes = useStyles();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(
        "The Password Confirmation Doesn't Match Entered Password"
      );
    }
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoading(false);
      history.push(HOME_ROUTE);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return setError(
            "The provided email is already in use by an existing user. Please enter a different email address."
          );
          break;
        case "auth/invalid-email":
          return setError("Invalid email. Please enter a valid email address.");
          break;
        case "auth/weak-password":
          return setError(
            "Invalid password. Password must be six or more characters."
          );
          break;
        default:
          return setError(
            "Invalid email or password. Please enter a valid correct email and password"
          );
      }
    }
  }
  useEffect(() => {
    if (user !== null) {
      updateProfile(user, {
        displayName: userNameRef.current.value,
      }).catch((error) => {
        console.log(error.message);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user !== null) {
      const data = {};
      setDoc(doc(firestore, "users", user.uid), data);
    }
  }, [user]);

  return (
    <div className={classes.root}>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25rem" },
        }}
      >
        <FormControl component="form" onSubmit={handleSubmit} margin="normal">
          <h1 className={classes.heading}>Registration Form</h1>
          <TextField
            inputRef={userNameRef}
            label="Username"
            type="text"
            variant="outlined"
            required
          />
          <TextField
            inputRef={emailRef}
            label="Email"
            type="email"
            variant="outlined"
            required
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            type="password"
            variant="outlined"
            required
          />
          <TextField
            inputRef={passwordConfirmRef}
            label="Re-Type Password"
            type="password"
            variant="outlined"
            required
          />
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}

          <button className={classes.button} disabled={loading} type="submit">
            Register
          </button>
        </FormControl>
      </Box>
    </div>
  );
};

export default Register;
