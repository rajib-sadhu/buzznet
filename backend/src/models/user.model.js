import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    avatar: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    // username: {
    //   type: String,
    //   unique: true,
    //   lowercase: true,
    //   trim: true,
    //   index: true,
    // },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
