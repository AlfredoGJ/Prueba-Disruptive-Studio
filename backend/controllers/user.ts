import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import { HTTP200Ok, HTTP201Created } from "infra/http/responses";
import { modelValidator } from "middleware/validation";
import user from "infra/db/scheemas/user";

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
    .post("/", modelValidator(user), async (req: Request, res: Response) => {
      const { user } = req.body;

      usersService.createUser(user);
      return HTTP201Created(res, user);
    });
};
