import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import mongoose from "mongoose";
import {
  HTTP400BadRequest,
  HTTP401Unauthorized,
  HTTP403Forbidden,
} from "infra/http/responses";
import { User, UserType } from "domain/models";
import Jwt from "jsonwebtoken";
import { error } from "console";

export const Authx = (users: UserType[]) => {
  return (
    req: Request & { user },
    res: Response,
    next: express.NextFunction
  ) => {
    const authorization = req.headers.authorization;

    if (!authorization)
      return HTTP401Unauthorized(
        res,
        "Not Authorized",
        "You must be logged in to perform this action"
      );
    let token = authorization.split(" ")[1];
    if (!token)
      return HTTP401Unauthorized(
        res,
        "Not Authorized",
        "You must be logged in to perform this action"
      );

    Jwt.verify(token, process.env.TOKEN_SECRET, (error, user: User) => {
      if (error)
        return HTTP401Unauthorized(
          res,
          "Not Authorized",
          "Your credentials are invalid. Please log in again."
        );

      // Authorization part
      if (!users.includes(user.type))
        return HTTP403Forbidden(
          res,
          "Not Authorized",
          "You don't have the necessary permissions to perform this action."
        );

      req.user = user;
      next();
    });
  };
};
