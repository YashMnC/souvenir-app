import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  addComment,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
// router.post("/", auth, createPost);
// router.patch("/:id", auth, updatePost);
// router.delete("/:id", auth, deletePost);
// router.patch("/:id/likePost", auth, likePost);
// router.post("/:id/commentPost", auth, addComment);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
router.post("/:id/commentPost", addComment);

export default router;
