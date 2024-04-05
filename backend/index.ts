import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "infra/db/connect";
import express = require("express");
import { MongoDbUserRepository } from "repositories/mongodbUserRepository";
import mongoose from "mongoose";
import { UsersController } from "controllers/user";

import user from "infra/db/scheemas/user";
import { modelValidator } from "middleware/validation";

function start() {
  connectDatabase();
  const userRepository = new MongoDbUserRepository(user);
  const api = express();
  const usersController = UsersController({}, userRepository);
  api.use(express.json());
  api.use("/users", usersController);
  api.listen(process.env.PORT, () => {
    console.info(`Api running in port ${process.env.PORT}`);
  });
}

start();
