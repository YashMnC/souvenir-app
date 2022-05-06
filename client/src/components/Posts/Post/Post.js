import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("profile"));

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openPost = () => navigate(`/posts/${post._id}`);

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?._id || user?.result?.googleId)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length} others like`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 1
            ? `${post.likes.length} likes`
            : `${post.likes.length} like`}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        {/* {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              size="small"
              style={{ color: "white" }}
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              {/* <MoreHorizIcon fontSize="default" /> 
              Edit
            </Button>
          </div>
        )} */}

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          {" "}
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Likes />
        </Button>

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              size="small"
              style={{ color: "white" }}
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              {/* <MoreHorizIcon fontSize="default" /> */}
              Edit
            </Button>
          </div>
        )}

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
