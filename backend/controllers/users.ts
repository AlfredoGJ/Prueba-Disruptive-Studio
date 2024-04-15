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
import userScheema from "infra/db/scheemas/user";
import { Authx } from "middleware/AuthX";
import { UserType } from "domain/models";

export const UsersController = (
  options: RouterOptions,
  usersService: IUserRepository
) => {
  return express
    .Router(options)
    .get("/", async (req: Request, res: Response) => {
      try {
        const users = await usersService.getAll();
        return HTTP200Ok(res, users);
      } catch (error) {
        return HTTP500InternalServerError(
          res,
          "An unexpected error ocurred",
          error.message
        );
      }
    })
    .post(
      "/",
      modelValidator(userScheema),
      async (req: Request, res: Response) => {
        try {
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
          const existsUser = await usersService.existUserById(id);
          if (!existsUser)
            return HTTP400BadRequest(res, "Bad Request", "User does not exist");

          await usersService.deleteUser(id);
          return HTTP200Ok(res, "User deleted succesfully");
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
      modelValidator(userScheema),
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const { user } = req.body;
          const existsUser = await usersService.existUserById(id);
          if (!existsUser)
            return HTTP400BadRequest(res, "Bad Request", "User does not exist");

          await usersService.updateUser(id, user);
          return HTTP200Ok(res, "User updated succesfully");
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
