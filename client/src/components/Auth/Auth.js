import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Avatar,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../../actions/auth";
import jwt_decode from "jwt-decode";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(login(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);

    const result = userObject;
    //const token = userObject.email;
    const token = result?.sub;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      //  navigate("/posts");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("loginBtn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Login"}</Typography>

        <Button
          className={classes.googleButton}
          fullWidth
          color="primary"
          id="loginBtn"
          startIcon={<Icon />}
          variant="contained"
        >
          Login with Google
        </Button>
      </Paper>
    </Container>
  );
};

export default Auth;
