import { User } from "../models/user.model.js";

import jwt from "jsonwebtoken";
import { mongoose } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, gender } = req.body;

  if ([fullName, email, gender].some((field) => field?.trim() === "")) {
    return res
      .status(400)
      .json(new ApiError(400, "Please fill the required fields"));
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    return res
      .status(409)
      .json(new ApiError(409, "User with email already exists."));
  }

  const user = await User.create({
    fullName,
    email,
    gender,
  });

  const createUser = await User.findById(user?.id);

  if (!createUser) {
    return res
      .status(500)
      .json(
        new ApiError(500, "Somethings went wrong! while registering the user.")
      );
  }

  console.log("User create successfully.");

  return res
    .status(201)
    .json(new APIResponse(201, createUser, "User create successfully."));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return res
    .status(200)
    .json(new APIResponse(200, token, "Access token refreshed."));
});

const userInfo = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json(new ApiError(400, "Email is required."));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json(new ApiError(400, "User not found"));
  }

  return res
    .status(201)
    .json(new APIResponse(201, user, "User details fetch."));
});

const updateBio = asyncHandler(async (req, res) => {
  const { bio } = req.body;

  const user = req?.user;

  console.log(user);

  if (!bio) {
    return res
      .status(400)
      .json(new ApiError(400, "Please fill the bio fields"));
  }

  if (bio.length <= 200) {
    return res
      .status(400)
      .json(new ApiError(400, "Please write the bio in 200 characters."));
  }

  // const user = await User.updateOne();
});

export { registerUser, refreshAccessToken, userInfo, updateBio };
