import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");
import {
  HTTP200Ok,
  HTTP201Created,
  HTTP400BadRequest,
  HTTP401Unauthorized,
} from "infra/http/responses";
import { modelValidator } from "middleware/validation";
import userScheema from "infra/db/scheemas/user";
import { User } from "domain/models";
import Jwt from "jsonwebtoken";

function generateAccessToken(user: User) {
  return Jwt.sign(
    { name: user.name, type: user.type, email: user.email },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 2000,
    }
  );
}

export const AuthController = (
  options: RouterOptions,
  usersService: IUserRepository
) => {
  return express
    .Router(options)
    .post("/login", async (req: Request, res: Response) => {
      const { email, username } = req.body;
      const user = await usersService.getUserByEmail(email);

      if (user && username === user.name) {
        const token = generateAccessToken(user);
        return HTTP200Ok(res, { token });
      } else
        return HTTP401Unauthorized(res, "Unauthorized", "Invalid Credentials");
    })
    .post(
      "/signup",
      modelValidator(userScheema),
      async (req: Request, res: Response) => {
        const { user } = req.body;

        if (user.type === "ADMIN")
          return HTTP400BadRequest(
            res,
            "Bad Request",
            "You are not allowed to perform this action."
          );

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
        const token = generateAccessToken(user)
        return HTTP200Ok(res, {token});
      }
    );
};
