import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import {
  HTTP200Ok,
  HTTP201Created,
  HTTP400BadRequest,
  HTTP500InternalServerError,
} from "infra/http/responses";
import { modelValidator } from "middleware/validation";
import postScheema from "infra/db/scheemas/Post";
import multer = require("multer");
import { Authx } from "middleware/AuthX";
import { Post, UserType } from "domain/models";
import { IPostRepository } from "repositories/interfaces/IPostRepository";
import { group } from "console";
import { validContentTypes } from "domain/models/contentType";
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
        try {
          const { post } = req.body;

          postsRepository.createPost(post);
          return HTTP201Created(res, post);
        } catch (error) {
          return HTTP500InternalServerError(
            res,
            "An unexpected error ocurred",
            error.message
          );
        }
      }
    )
    .get(
      "/",
      Authx([UserType.ADMIN, UserType.CREATOR, UserType.VIEWER]),
      async (req: Request, res: Response) => {
        try {
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
        } catch (error) {
          return HTTP500InternalServerError(
            res,
            "An unexpected error ocurred",
            error.message
          );
        }
      }
    )
    .get("/summary", async (req: Request, res: Response) => {
      try {
        const postsByTopic = await postsRepository.getAllPostsByType();
        return HTTP200Ok(res, postsByTopic);
      } catch (error) {
        return HTTP500InternalServerError(
          res,
          "An unexpected error ocurred",
          error.message
        );
      }
    })
    .get(
      "/query",
      Authx([UserType.ADMIN, UserType.CREATOR, UserType.VIEWER]),
      async (req: Request, res: Response) => {
        try {
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
        } catch (error) {
          return HTTP500InternalServerError(
            res,
            "An unexpected error ocurred",
            error.message
          );
        }
      }
    )
    .delete(
      "/:id",
      Authx([UserType.ADMIN]),
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const existsPost = await postsRepository.existPostById(id);
          if (!existsPost)
            return HTTP400BadRequest(res, "Bad Request", "Post does not exist");

          await postsRepository.deletePost(id);
          return HTTP200Ok(res, "Post deleted succesfully");
        } catch (error) {
          return HTTP500InternalServerError(
            res,
            "An unexpected error ocurred",
            error.message
          );
        }
      }
    )
    .patch(
      "/:id",
      Authx([UserType.ADMIN]),
      upload.single("imageContent"),
      async (
        req: Request & { file: { data: Buffer; mimetype: string } },
        res: Response
      ) => {
        try {
          const { id } = req.params;
          const { topic, textContent, title, author, type } = req.body;
          const { file } = req;
          const post = {
            topic,
            textContent,
            title,
            author,
            type,
            imageContent: file ? file : "",
          };

          const existsPost = await postsRepository.existPostById(id);
          if (!existsPost)
            return HTTP400BadRequest(res, "Bad Request", "Post does not exist");

          await postsRepository.updatePost(id, post);
          return HTTP200Ok(res, "Post updated succesfully");
        } catch (error) {
          return HTTP500InternalServerError(
            res,
            "An unexpected error ocurred",
            error.message
          );
        }
      }
    );
};
