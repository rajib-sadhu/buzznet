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

// Routes imports
import userRoutes from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRoutes);

export default app;
