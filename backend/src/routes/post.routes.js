import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addPost, getAllPosts } from "../controllers/post.controller.js";

const router = Router();

// add post
router.route("/add-post").post(verifyJwt, addPost);

// get all posts
router.route("/all-posts").get(getAllPosts)

export default router;
