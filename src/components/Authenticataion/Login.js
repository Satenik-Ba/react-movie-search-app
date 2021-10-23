import React, { useRef, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { REGISTER_ROUTE, HOME_ROUTE } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    height: "2.5rem",
    "&:hover": {
      backgroundColor: "#7b84a4",
    },
  },
});
const Login = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const history = useHistory();
  const auth = getAuth();

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function handleSignIn(e) {
    e.preventDefault();
    setError("");

    try {
      login(emailRef.current.value, passwordRef.current.value);
      history.push(HOME_ROUTE);
    } catch {
      setError("Failed to log in");
    }
  }
  return (
    <div className={classes.root}>
      <FormControl component="form" onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          inputRef={emailRef}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          inputRef={passwordRef}
          required
        />
        <button className={classes.button}>Log In</button>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
        </FormGroup>
        <Link>Forgot Password?</Link>
        <p>
          New to ArmFilm?{" "}
          <span>
            <Link to={REGISTER_ROUTE}>Sign Up Now</Link>
          </span>
        </p>
      </FormControl>
    </div>
  );
};

export default Login;
