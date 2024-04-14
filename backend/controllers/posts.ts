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
import { group } from "console";
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
      upload.single("imageContent"),
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
    )
    .get(
      "/",
      Authx([UserType.ADMIN, UserType.CREATOR, UserType.VIEWER]),
      async (req: Request, res: Response) => {
        const groupBy = req.query.groupBy;

        if (groupBy && groupBy === "type") {
          const postsByTopic = await postsRepository.getAllPostsByType();
          console.info("Posts", postsByTopic);
          return HTTP200Ok(res, postsByTopic);
        } else {
          const posts = await postsRepository.getAllPosts();
          console.info("Posts", posts[0]);
          return HTTP200Ok(res, posts);
        }
      }
    )
    .get("/summary", async (req: Request, res: Response) => {
      const postsByTopic = await postsRepository.getAllPostsByType();
      return HTTP200Ok(res, postsByTopic);
    })
    .get(
      "/query",
      Authx([UserType.ADMIN, UserType.CREATOR, UserType.VIEWER]),
      async (req: Request, res: Response) => {
        const { title, topic, type, pageNumber, itemsPerPage } = req.query;
        const posts = await postsRepository.queryPosts(
          title as string,
          topic as string,
          type as string,
          Number(pageNumber),
          Number(itemsPerPage)
        );
        console.info("Posts", posts[0]);
        return HTTP200Ok(res, posts);
      }
    )
    .delete(
      "/:id",
      Authx([UserType.ADMIN]),
      async (req: Request, res: Response) => {
        const { id } = req.params;
        console.log("ID", id);
        const existsPost = await postsRepository.existPostById(id);
        if (!existsPost)
          return HTTP400BadRequest(res, "Bad Request", "Post does not exist");

        await postsRepository.deletePost(id);
        return HTTP200Ok(res, "Post deleted succesfully");
      }
    )
    .patch(
      "/:id",
      Authx([UserType.ADMIN]),
      upload.single("imageContent"),
      modelValidator(postScheema),
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const { post } = req.body;
        console.log("ID", id);
        const existsPost = await postsRepository.existPostById(id);
        if (!existsPost)
          return HTTP400BadRequest(res, "Bad Request", "Post does not exist");

        await postsRepository.updatePost(id, post);
        return HTTP200Ok(res, "Post updated succesfully");
      }
    );
};
