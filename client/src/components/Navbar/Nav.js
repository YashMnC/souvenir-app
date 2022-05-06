import React, { useState, useEffect } from "react";
import {
  Grid,
  AppBar,
  Typography,
  Avatar,
  Button,
  Toolbar,
} from "@material-ui/core";
import useStyles from "./styles";
import souvenir from "../../images/souvenir.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = user?.token;
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/auth");
    setTimeout(() => {
      window.location.reload();
    }, 2);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Grid item xs={12} sm={12} md={12}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link
          style={{ textDecoration: "none" }}
          to="/"
          className={classes.brandContainer}
        >
          <Typography className={classes.heading} variant="h2" align="center">
            Souvenirs
          </Typography>

          <img
            className={classes.image}
            src={souvenir}
            alt="icon"
            height="60"
          />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              color="primary"
              variant="contained"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
