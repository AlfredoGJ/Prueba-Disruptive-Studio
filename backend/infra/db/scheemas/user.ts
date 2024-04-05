import mongoose, { Schema } from "mongoose";
import { User, UserType } from "../../../domain/models/user";

const UserScheema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true, enum: UserType },
});

export default mongoose.model("User", UserScheema);
