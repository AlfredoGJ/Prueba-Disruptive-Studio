import mongoose, { Schema } from "mongoose";
import { Item } from "../../../domain/models";
import { ContentTypeScheema } from "./contentType";
import { TopicScheema } from "./topic";

const ItemScheema = new Schema<Item>({
  topic: { type: TopicScheema, required: true },
  type: { type: ContentTypeScheema, required: true },
  value: { type: String, required: true },
});

export default mongoose.model("Item", ItemScheema);
