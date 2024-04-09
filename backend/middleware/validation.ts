import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import mongoose from "mongoose";
import { HTTP400BadRequest } from "infra/http/responses";

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
            HTTP400BadRequest(res, "Invalid ContentType",reason.message);
          });
        break;

      case "Post":
        let post = new model(body);
        model
          .validate(post)
          .then((value) => {
            req.body.post = post;
            next();
          })
          .catch((reason) => {
            HTTP400BadRequest(res,"Invalid Post", reason.message);
          });
        break;

      default:
        next();
    }
  };
};
