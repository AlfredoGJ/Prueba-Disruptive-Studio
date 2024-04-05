import mongoose from "mongoose";

const host = process.env.MONGODB_HOST;
const user = process.env.MONGODB_USER;
const database = process.env.MONGODB_DATABASE;

console.warn("Connection:",`${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`)
async function connectDatabase() {
  await mongoose.connect(`${host}/${database}`);
}

export default connectDatabase
