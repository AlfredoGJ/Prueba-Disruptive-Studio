import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "infra/db/connect";
import express = require("express");
import cors = require("cors");

import {
  UserScheema,
  TopicScheema,
  ContentTypeScheema,
  PostScheema,
} from "infra/db/scheemas";

import {
  MongoDbContentTypeRepository,
  MongoDbTopicRepository,
  MongoDbUserRepository,
  MongoDbPostRepository,
} from "./repositories";

import {
  AuthController,
  UsersController,
  TopicsController,
  ContentTypeController,
  PostsController,
} from "controllers/";

function start() {
  connectDatabase();
  const userRepository = new MongoDbUserRepository(UserScheema);
  const topicsRepository = new MongoDbTopicRepository(TopicScheema);
  const contentTypeRepository = new MongoDbContentTypeRepository(
    ContentTypeScheema
  );
  const postRepository = new MongoDbPostRepository(PostScheema);
  const api = express();

  const usersController = UsersController({}, userRepository);
  const topicsController = TopicsController({}, topicsRepository);
  const authController = AuthController({}, userRepository);
  const contentTypeController = ContentTypeController(
    {},
    contentTypeRepository
  );
  const postController = PostsController({}, postRepository);

  api.use(express.json());
  api.use("/auth", authController);
  api.use("/users", usersController);
  api.use("/topics", topicsController);
  api.use("/contentTypes", contentTypeController);
  api.use("/posts", postController);
  const app = express();

  app.use(cors({ origin: "*" }));
  app.use("/api", api);
  app.listen(process.env.PORT, () => {
    console.info(`Api running in port ${process.env.PORT}`);
  });
}

start();
