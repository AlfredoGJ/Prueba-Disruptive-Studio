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
    { name: user.name, type: user.type, email:user.email },
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
      } else return HTTP401Unauthorized(res, "Incorrect Credentials");
    });
};
