import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import {
  HTTP200Ok,
  HTTP201Created,
  HTTP400BadRequest,
} from "infra/http/responses";
import { modelValidator } from "middleware/validation";
import postScheema from "infra/db/scheemas/Post";
import multer = require("multer");
import { Authx } from "middleware/AuthX";
import { UserType } from "domain/models";
import { IPostRepository } from "repositories/interfaces/IPostRepository";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const PostsController = (
  options: RouterOptions,
  postsRepository: IPostRepository
) => {
  return express
    .Router(options)
    .post(
      "/",
      Authx([UserType.ADMIN, UserType.CREATOR]),
      upload.single("cover"),
      modelValidator(postScheema),
      async (req: Request & { user }, res: Response) => {
        const { post } = req.body;
        console.error("I Entered the controller :S");
        console.log("POST", post);
        // const existTopic = await topicsRepository.existTopic(topic.name);
        console.log("USER", req.user);

        postsRepository.createPost(post);
        return HTTP201Created(res, post);
      }
    );
};
