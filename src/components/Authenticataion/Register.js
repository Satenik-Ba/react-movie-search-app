import React, { useRef, useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
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
  },
  button: {
    backgroundColor: "#171c2c",
    color: "white",
    height: "3rem",
    "&:hover": {
      backgroundColor: "#7b84a4",
    },
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
      return setError("Passwords do not match");
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
    } catch {
      setError("Failed to create an account");
    }
  }
  useEffect(() => {
    if (user !== null) {
      updateProfile(user, {
        displayName: userNameRef.current.value,
      })
        .then(() => {
          console.log("profile was updated");
        })
        .catch((error) => {
          console.log(error, "an error has occured");
        });
    }
  }, [user]);

  useEffect(() => {
    if (user !== null) {
      const data = {};
      setDoc(doc(firestore, "users", user.uid), data);
    }
  }, [user]);

  // dialog vs alert to show error message
  return (
    <div className={classes.root}>
      <FormControl component="form" onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
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
        <button className={classes.button} disabled={loading} type="submit">
          Register
        </button>
      </FormControl>
    </div>
  );
};

export default Register;
