import mongoose, { Schema } from "mongoose";
import { Topic } from "../../../domain/models";
import { ContentTypeScheema } from "./contentType";

const TopicScheema = new Schema<Topic>({
  name: { type: String, required: true },
  cover: {
    data: Buffer,
    contentType: String,
  },
  allowedContent: [{ type: String, required: true }],
});

export { TopicScheema };
export default mongoose.model("Topic", TopicScheema);
