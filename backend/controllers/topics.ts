import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import {
  HTTP200Ok,
  HTTP201Created,
  HTTP400BadRequest,
} from "infra/http/responses";
import { modelValidator } from "middleware/validation";
import topicScheema from "infra/db/scheemas/topic";
import { ITopicRepository } from "repositories/interfaces/ITopicRepository";
import multer = require("multer");
import { Authx } from "middleware/AuthX";
import { UserType } from "domain/models";
import topic from "infra/db/scheemas/topic";
import mongoose from "mongoose";
const { Binary } = mongoose.mongo;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const TopicsController = (
  options: RouterOptions,
  topicsRepository: ITopicRepository
) => {
  return express
    .Router(options)
    .get("/", async (req: Request, res: Response) => {
      const contentCount = req.query.contentCount;
      console.log("Content Count", contentCount);
      if (contentCount) {
        const topics = await topicsRepository.getAllTopicsWithContentCount();
        console.info("Topics", topics[0]);
        return HTTP200Ok(res, topics);
      }
      const topics = await topicsRepository.getAllTopics();
      console.info("Topics", topics[0]);
      return HTTP200Ok(res, topics);
    })

    .get(
      "/:contentType",
      Authx([UserType.ADMIN, UserType.CREATOR]),
      async (req: Request, res: Response) => {
        const { contentType } = req.params;
        const topics = await topicsRepository.getTopicsThatAcceptsContent(
          contentType
        );
        return HTTP200Ok(res, topics);
      }
    )
    .post(
      "/",
      Authx([UserType.ADMIN]),
      upload.single("cover"),
      modelValidator(topicScheema),
      async (req: Request & { user }, res: Response) => {
        const { topic } = req.body;
        console.error("I Entered the controller :S");
        const existTopic = await topicsRepository.existTopicByName(topic.name);
        console.log("USER", req.user);
        if (existTopic)
          return HTTP400BadRequest(res, "Bad Request", "Topic already exists");

        topicsRepository.createTopic(topic);
        return HTTP201Created(res, topic);
      }
    )
    .delete(
      "/:id",
      Authx([UserType.ADMIN]),
      async (req: Request, res: Response) => {
        const { id } = req.params;
        console.log("ID", id);
        const existsTopic = await topicsRepository.existTopicById(id);
        if (!existsTopic)
          return HTTP400BadRequest(
            res,
            "Bad Request",
            "Content type does not exist"
          );

        await topicsRepository.deleteTopic(id);
        return HTTP200Ok(res, "Content type deleted succesfully");
      }
    )
    .patch(
      "/:id",
      Authx([UserType.ADMIN]),
      modelValidator(topicScheema),
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const { topic } = req.body;
        console.log("ID", id);
        const existsTopic = await topicsRepository.existTopicById(id);
        if (!existsTopic)
          return HTTP400BadRequest(
            res,
            "Bad Request",
            "Content type does not exist"
          );

        await topicsRepository.updateTopic(id, topic);
        return HTTP200Ok(res, "Content type deleted succesfully");
      }
    );
};
