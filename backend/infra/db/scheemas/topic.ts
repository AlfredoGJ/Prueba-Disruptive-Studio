import mongoose, { Schema } from "mongoose";
import { Topic } from "../../../domain/models";
import ContentTypeScheema from "./contentType";

const TopicScheema = new Schema<Topic>({
  name: { type: String, required: true },
  cover:{type:ImageBitmap, required:true},
  allowedContent:[{type:ContentTypeScheema}]
});

export default mongoose.model("Topic", TopicScheema);
