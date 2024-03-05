import { Router } from "express";
import {
  refreshAccessToken,
  registerUser,
  updateBio,
  userInfo,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

// Verify JWT
router.route("/jwt").post(refreshAccessToken);

// Create account
router.route("/register").post(registerUser);

// User details
router.route("/user-details").get(verifyJwt, userInfo);

// Update Bio
router.route("/bio").post(verifyJwt, updateBio);

export default router;
