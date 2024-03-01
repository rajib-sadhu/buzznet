import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      throw new ApiError(401, "Unauthorized request");
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decode) => {
      if (error) {
        return new ApiError(401, "Invalid access token.");
      }

      req.user = decode;

      next();
    });
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
