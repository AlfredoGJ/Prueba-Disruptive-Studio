import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import {
  HTTP200Ok,
  HTTP201Created,
  HTTP400BadRequest,
} from "infra/http/responses";
import { modelValidator } from "middleware/validation";
import userScheema from "infra/db/scheemas/user";

export const UsersController = (
  options: RouterOptions,
  usersService: IUserRepository
) => {
  return express
    .Router(options)
    .get("/", async (req: Request, res: Response) => {
      console.log(options);
      console.log(usersService);
      const users = await usersService.getAll();
      return HTTP200Ok(res, users);
    })
    .post(
      "/",
      modelValidator(userScheema),
      async (req: Request, res: Response) => {
        const { user } = req.body;

        const existEmail = await usersService.existUserWithEmail(user.email);
        const existName = await usersService.existUserWithName(user.name);

        if (existEmail)
          return HTTP400BadRequest(
            res,
            "Bad Request",
            "The email already exists."
          );

        if (existName)
          return HTTP400BadRequest(
            res,
            "Badrequest",
            "The username already exists."
          );

        usersService.createUser(user);
        return HTTP201Created(res, user);
      }
    );
};
