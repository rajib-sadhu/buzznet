import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { APIResponse } from "./utils/ApiResponse.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

// Verify JWT
app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return res
    .status(200)
    .json(new APIResponse(200, token, "Access token refreshed."));
});



export default app;
