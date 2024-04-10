import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import mongoose from "mongoose";
import { HTTP400BadRequest } from "infra/http/responses";
import { text } from "stream/consumers";

export const modelValidator = <T>(model: mongoose.Model<T>) => {
  return (
    req: Request & { file: { buffer; mimetype } },
    res: Response,
    next: express.NextFunction
  ) => {
    var body = req.body;

    console.log("Body", req.body);

    switch (model.modelName) {
      case "Topic":
        let topicData = {
          name: body.name,
          cover: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          },
          allowedContent: body.allowedContent,
        };
        const topic = new model(topicData);
        // console.log("Model", topic);
        model
          .validate(topic)
          .then((value) => {
            req.body.topic = topic;
            // console.log("Topic", topic )
            next();
          })
          .catch((reason) => {
            HTTP400BadRequest(res, "Invalid Topic", reason.message);
          });
        break;
      case "User":
        let user = new model(body);
        model
          .validate(user)
          .then((value) => {
            req.body.user = user;
            next();
          })
          .catch((reason) => {
            HTTP400BadRequest(res, "Invalid User", reason.message);
          });
        break;

      case "ContentType":
        let contentType = new model(body);
        model
          .validate(contentType)
          .then((value) => {
            req.body.contentType = contentType;
            next();
          })
          .catch((reason) => {
            HTTP400BadRequest(res, "Invalid ContentType", reason.message);
          });
        break;

      case "Post":
        console.log("Request", req)
        let postData = {
          title: body.title,
          topic: body.topic,
          type: body.type,
          author: body.author,
          textContent: body.textContent,
          imageContent:
            body.type === "Image"
              ? {
                  data: req.file.buffer,
                  contentType: req.file.mimetype,
                }
              : null,
        };

        let post = new model(postData);
        model
          .validate(post)
          .then((value) => {
            req.body.post = post;
            next();
          })
          .catch((reason) => {
            HTTP400BadRequest(res, "Invalid Post", reason.message);
          });
        break;

      default:
        next();
    }
  };
};
