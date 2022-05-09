import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Avatar,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import GoogleLogin from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../../actions/auth";

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

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      navigate("/posts");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log("Google Log In was unsuccessful. Try again later.", error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Login"}</Typography>
        {/* <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button> */}

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <Button
              className={classes.googleButton}
              fullWidth
              color="primary"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Icon />}
              variant="contained"
            >
              Login with Google
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />

        {/* <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {" "}
              {isSignup
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}{" "}
            </Button>
          </Grid>
        </Grid> */}
        {/* </form> */}
      </Paper>
    </Container>
  );
};

export default Auth;
