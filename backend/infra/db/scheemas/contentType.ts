import mongoose, { Schema } from "mongoose";
import { ContentType } from "../../../domain/models";
import { validContentTypes } from "domain/models/contentType";

const ContentTypeScheema = new Schema<ContentType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: validContentTypes },
});

export { ContentTypeScheema };
export default mongoose.model("ContentType", ContentTypeScheema);
