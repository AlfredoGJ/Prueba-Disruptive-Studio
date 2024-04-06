import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "infra/db/connect";
import express = require("express");
import cors = require("cors");
import { MongoDbUserRepository } from "repositories/mongodbUserRepository";
import { UsersController } from "controllers/users";

import userScheema from "infra/db/scheemas/user";
import topicScheema from "infra/db/scheemas/topic";
import { TopicsController } from "controllers/topics";
import { MongoDbTopicRepository } from "repositories/mongodbTopicRepository ";
import { AuthController } from "controllers/auth";

function start() {
  connectDatabase();
  const userRepository = new MongoDbUserRepository(userScheema);
  const topicsRepository = new MongoDbTopicRepository(topicScheema);
  const api = express();

  const usersController = UsersController({}, userRepository);
  const topicsController = TopicsController({}, topicsRepository);
  const authController = AuthController({}, userRepository);
  api.use(express.json());
  api.use("/auth", authController);
  api.use("/users", usersController);
  api.use("/topics", topicsController);
  const app = express();

  app.use(cors({origin: "*"}));
  app.use("/api", api);
  app.listen(process.env.PORT, () => {
    console.info(`Api running in port ${process.env.PORT}`);
  });
}

start();
