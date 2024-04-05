import mongoose, { Schema } from "mongoose";
import { User } from "../../../domain/models/user";

const UserScheema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
});

export default mongoose.model("User", UserScheema);
