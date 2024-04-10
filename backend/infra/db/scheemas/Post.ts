import mongoose, { Schema } from "mongoose";
import { Post } from "../../../domain/models";
import contentType, { ContentTypeScheema } from "./contentType";
import { TopicScheema } from "./topic";
import { UserScheema } from "./user";

const PostScheema = new Schema<Post>({
  topic: { type: String, required: true },
  type: { type: String, required: true },
  textContent: {
    type: String,
    required: function () {
      return this.type.name === "Text";
    },
  },
  imageContent: {
    type: { data: Buffer, contentType: String },
    required: function () {
      return this.type.name === "Image";
    },
  },
  title: { type: String, required: true },
  author: { type: String, required: true },
});

export default mongoose.model("Post", PostScheema);
