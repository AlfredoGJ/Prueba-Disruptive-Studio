import mongoose from "mongoose";
import { ContentTypeScheema, UserScheema } from "./scheemas";

const host = process.env.MONGODB_HOST;
const user = process.env.MONGODB_USER;
const database = process.env.MONGODB_DATABASE;

console.warn(
  "Connection:",
  `${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
);
async function connectDatabase() {
  await mongoose.connect(`${host}/${database}`).then(() => {
    UserScheema.create({
      name: "Admin",
      email: "admin@myapp.com",
      type: "ADMIN",
    });

    ContentTypeScheema.create([
      { description: "A video from youtube", name: "Youtube Video", type: "Video" },
      { description: "A text post", name: "Text", type: "Text" },
      { description: "An image post", name: "Image", type: "Image" },
    ]);
  });
}

export default connectDatabase;
