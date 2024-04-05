import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import mongoose from "mongoose";
import { HTTP400BadRequest } from "infra/http/responses";

export const modelValidator = <T>(model: mongoose.Model<T>) => {
  return (req: Request, res: Response, next: express.NextFunction) => {
    var body = req.body;

    switch (model.modelName) {
      case "Topic":
        let topic = new model(body);
        model
          .validate(topic)
          .then((value) => {
            req.body.topic = topic;
            return next();
          })
          .catch((reason) => {
            return HTTP400BadRequest(res, reason);
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
            HTTP400BadRequest(res, reason);
          });
        break;

      case "ContentType":
        let contentType = new model(body);
        model
          .validate(contentType)
          .then((value) => {
            req.body.contentTupe = contentType;
            next();
          })
          .catch((reason) => {
            HTTP400BadRequest(res, reason);
          });
        break;

      case "Item":
        let item = new model(body);
        model
          .validate(item)
          .then((value) => {
            req.body.item = item;
            next();
          })
          .catch((reason) => {
            HTTP400BadRequest(res, reason);
          });
        break;

      default:
        next();
    }
  };
};
