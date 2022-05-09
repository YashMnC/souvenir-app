import React, { useEffect, useState } from "react";
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
//import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?._id || user?.result?.googleId;
  //const hasCurrentUserLikedPost = post.likes.find((like) => like === userId);
  const openPost = () => navigate(`/posts/${post._id}`);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [window.location]);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    // if (hasCurrentUserLikedPost) {
    //   setLikes(post.likes.filter((id) => id !== userId));
    // } else {
    //   setLikes([...post.likes, userId]);
    // }
  };

  useEffect(() => {
    setLikes(post.likes);
  }, [post.likes]);

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((id) => id === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length} others like`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;
          {likes.length > 1 ? `${likes.length} likes` : `${likes.length} like`}
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
            {post.message.length > 30
              ? post.message.substring(0, 50) + ".....Read more."
              : post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
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
