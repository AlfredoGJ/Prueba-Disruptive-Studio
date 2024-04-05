import mongoose, { Schema } from "mongoose";
import { Topic } from "../../../domain/models";
import { ContentTypeScheema } from "./contentType";

const TopicScheema = new Schema<Topic>({
  name: { type: String, required: true },
  cover: {
    data: Buffer,
    contentType: String,
  },
  allowedContent: [{ type: ContentTypeScheema, required: true }],
});

export default mongoose.model("Topic", TopicScheema);
