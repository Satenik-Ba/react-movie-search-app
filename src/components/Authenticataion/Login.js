import React, { useRef, useState } from "react";
import { REGISTER_ROUTE, HOME_ROUTE } from "../../constants/routes";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { makeStyles } from "@mui/styles";
import { SIGNIN_ROUTE } from "../../constants/routes";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    height: '100vh',
    backgroundColor: 'white !important',
    "& a": {
      textDecoration: "none",
      color: "#171c2c",
      fontSize: "1.15rem",
      fontWeight: 700,
      "&:hover": {
        color: "#7b84a4",
        fontWeight: 400,
      },
    },
  },
  button: {
    backgroundColor: "#171c2c",
    alignSelf: "center",
    width: "25rem",
    fontSize: "1.2rem",
    color: "white",
    height: "3.5rem",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#7b84a4",
    },
  },
  heading: {
    color: "#171c2c",
    fontWeight: 600,
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
  },

  span: {
    fontSize: "1.15rem",
    textDecoration: "none",
    padding: "1rem",
    color: "black",
  },
});
const Login = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const history = useHistory();
  const auth = getAuth();

  async function handleSignIn(e) {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      if (history.location.pathname === SIGNIN_ROUTE) {
        history.push(HOME_ROUTE);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          return setError(
            "User not found. Please enter a valid email address."
          );
        case "auth/wrong-password":
          return setError("Wrong Password or in email");
        default:
          return setError(
            "Invalid email or password. Please enter a correct email and/or password"
          );
      }
    }
  }
  return (
    <div className={classes.root}>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25rem" },
        }}
      >
        {error && (
          <Alert variant="filled" severity="error" width="25rem">
            {error}
          </Alert>
        )}
        <FormControl component="form" onSubmit={handleSignIn} margin="normal">
          <h1 className={classes.heading}>Sign In</h1>
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
          <div className={classes.footer}>
            <Link>Forgot Password?</Link>
          </div>

          <div className={classes.span}>
            New to MFlix?{" "}
            <span>
              <Link to={REGISTER_ROUTE}>Sign Up Now</Link>
            </span>
          </div>
        </FormControl>
      </Box>
    </div>
  );
};
export default Login;
