import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json(new ApiError(401, "Unauthorized request"));
    }

    const token = auth.split(" ")[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, decode) => {
        if (error) {
          return res
            .status(401)
            .json(new ApiError(401, "Invalid access token."));
        }

        const user = await User.findOne({ email: decode.email });

        req.user = user;

        next();
      }
    );
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid access token"));
  }
});
