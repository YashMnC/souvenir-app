// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   ButtonBase,
// } from "@material-ui/core/";
// import moment from "moment";
// import { useDispatch } from "react-redux";
// import useStyles from "./styles";
// import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
// import DeleteIcon from "@material-ui/icons/Delete";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import { deletePost, likePost } from "../../../actions/posts";
// import { useNavigate } from "react-router-dom";

// const Post = ({ post, setCurrentId }) => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

//   const [likes, setLikes] = useState(post?.likes);
//   const userId = user?.result?.sub || user.token;

//   const hasCurrentUserLikedPost = post.likes.find((like) => like === userId);
//   const openPost = () => navigate(`/posts/${post._id}`);

//   useEffect(() => {
//     setUser(JSON.parse(localStorage.getItem("profile")));
//   }, [window.location]);

//   const handleLike = async () => {
//     dispatch(likePost(post._id));

//     if (hasCurrentUserLikedPost) {
//       setLikes(post.likes.filter((id) => id !== userId));
//     } else {
//       setLikes([...post.likes, userId]);
//     }
//   };

//   useEffect(() => {
//     setLikes(post.likes);
//   }, [post.likes]);

//   const Likes = () => {
//     if (likes?.length > 0) {
//       return likes.find((id) => id === userId) ? (
//         <>
//           <ThumbUpAltIcon fontSize="small" />
//           &nbsp;
//           {likes.length > 2
//             ? `You and ${likes.length} others like`
//             : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
//         </>
//       ) : (
//         <>
//           <ThumbUpAltOutlined fontSize="small" />
//           &nbsp;
//           {likes.length > 1 ? `${likes.length} likes` : `${likes.length} like`}
//         </>
//       );
//     }

//     return (
//       <>
//         <ThumbUpAltOutlined fontSize="small" />
//         &nbsp;Like
//       </>
//     );
//   };

//   return (
//     <Card className={classes.card} raised elevation={6}>
//       <ButtonBase className={classes.cardAction} onClick={openPost}>
//         <CardMedia
//           className={classes.media}
//           image={post.selectedFile}
//           title={post.title}
//         />
//         <div className={classes.overlay}>
//           <Typography variant="h6">{post.name}</Typography>
//           <Typography variant="body2">
//             {moment(post.createdAt).fromNow()}
//           </Typography>
//         </div>

//         {user?.result.sub === post?.creator && (
//           <div className={classes.overlay2}>
//             <Button
//               size="small"
//               style={{ color: "white" }}
//               onClick={() => {
//                 setCurrentId(post._id);
//               }}
//             >
//               <MoreHorizIcon fontSize="default" />
//               Edit
//             </Button>
//           </div>
//         )}

//         <div className={classes.details}>
//           <Typography variant="body2" color="textSecondary">
//             {post.tags.map((tag) => `#${tag} `)}
//           </Typography>
//         </div>

//         <Typography variant="h5" className={classes.title} gutterBottom>
//           {post.title}
//         </Typography>
//         <CardContent>
//           {" "}
//           <Typography variant="body2" color="textSecondary" component="p">
//             {post.message.length > 30
//               ? post.message.substring(0, 50) + ".....Read more."
//               : post.message}
//           </Typography>
//         </CardContent>
//       </ButtonBase>
//       <CardActions className={classes.cardActions}>
//         <Button
//           size="small"
//           color="primary"
//           disabled={!user?.result}
//           onClick={handleLike}
//         >
//           <Likes />
//         </Button>

//         {user?.result.sub === post?.creator && (
//           <div className={classes.overlay2}>
//             <Button
//               size="small"
//               style={{ color: "white" }}
//               onClick={() => {
//                 setCurrentId(post._id);
//               }}
//             >
//               <MoreHorizIcon fontSize="default" />
//               Edit
//             </Button>
//           </div>
//         )}

//         {user?.result.sub === post?.creator && (
//           <Button
//             size="small"
//             color="secondary"
//             onClick={() => {
//               dispatch(deletePost(post._id));
//             }}
//           >
//             <DeleteIcon fontSize="small" />
//             Delete
//           </Button>
//         )}
//       </CardActions>
//     </Card>
//   );
// };

// export default Post;

import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const userId = user?.result.sub || user?.token;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
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

  const openPost = (e) => {
    // dispatch(getPost(post._id, navigate));

    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.sub === post?.creator ||
          user?.token === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
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
        {(user?.result?.sub === post?.creator ||
          user?.token === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
