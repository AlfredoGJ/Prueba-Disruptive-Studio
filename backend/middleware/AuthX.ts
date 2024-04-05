import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import mongoose from "mongoose";
import { HTTP400BadRequest, HTTP401Unauthorized } from "infra/http/responses";
import { UserType } from "domain/models";
import Jwt from "jsonwebtoken";
import { error } from "console";

export const Authx = (users: UserType[]) => {
  return (
    req: Request & { user },
    res: Response,
    next: express.NextFunction
  ) => {
    const authorization = req.headers.authorization;
    let token = authorization.split(" ")[1];
    if (!token) return HTTP401Unauthorized(res, "Not Authorized");

    Jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
      if (error) return HTTP401Unauthorized(res, "Not Authorized");

      req.user = user;
      next();
    });
  };
};
