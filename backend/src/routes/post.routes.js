import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addPost,
  getAllPosts,
  getOneUserPosts,
} from "../controllers/post.controller.js";

const router = Router();

// add post
router.route("/add-post").post(verifyJwt, addPost);

// get all posts
router.route("/all-posts").get(verifyJwt, getAllPosts);

// get individual user posts
router.route("/user-posts").get(verifyJwt, getOneUserPosts);

export default router;
