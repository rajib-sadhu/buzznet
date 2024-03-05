import { Post } from "../models/post.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";

const addPost = asyncHandler(async (req, res) => {
  const { content, image } = req.body;

  if (content === "") {
    return res
      .status(400)
      .json(new ApiError(400, "Please fill the content fields"));
  }

  const post = await Post.create({
    content,
    image: image || "",
    owner: req?.user?._id,
  });

  return res
    .status(200)
    .json(new APIResponse(200, post, "Posted successfully."));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "userDetails",
      },
    },
  ]).sort({_id:-1});

  return res
    .status(200)
    .json(new APIResponse(200, posts, "All posts fetch successfully."));
});

export { addPost, getAllPosts };
