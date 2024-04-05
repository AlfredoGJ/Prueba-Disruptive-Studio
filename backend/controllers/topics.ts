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
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const TopicsController = (
  options: RouterOptions,
  topicsRepository: ITopicRepository
) => {
  return express
    .Router(options)
    .get("/", async (req: Request, res: Response) => {
      const topics = await topicsRepository.getAllTopics();
      return HTTP200Ok(res, topics);
    })
    .post(
      "/",
      upload.single("cover"),
      modelValidator(topicScheema),
      async (req: Request, res: Response) => {
        const { topic } = req.body;
        console.error("I Entered the controller :S");
        const existTopic = await topicsRepository.existTopic(topic.name);

        if (existTopic)
          return HTTP400BadRequest(res, "The email already exists.");

        topicsRepository.createTopic(topic);
        return HTTP201Created(res, topic);
      }
    );
};
