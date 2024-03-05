import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
