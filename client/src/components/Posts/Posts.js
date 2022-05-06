import React from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts && !isLoading) {
    return <Typography>No Posts.</Typography>;
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      justifyContent="space-evenly"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
