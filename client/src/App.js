import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [JSON.parse(localStorage.getItem("profile"))]);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route
            exact
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" replace={true} />}
          />

          <Route
            exact
            path="/"
            element={!user ? <Auth /> : <Navigate to="/posts" replace={true} />}
          />
          <Route
            exact
            path="/posts"
            element={!user ? <Navigate to="/auth" replace={true} /> : <Home />}
          />
          <Route exact path="/posts/:id" element={<PostDetails />} />
          <Route exact path="/posts/search" element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
