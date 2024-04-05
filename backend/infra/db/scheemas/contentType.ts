import mongoose, { Schema } from "mongoose";
import { ContentType } from "../../../domain/models";

const ContentTypeScheema = new Schema<ContentType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export { ContentTypeScheema };
export default mongoose.model("ContentType", ContentTypeScheema);
