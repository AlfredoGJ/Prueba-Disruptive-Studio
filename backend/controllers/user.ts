import { Request, Response, RouterOptions } from "express";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import express = require("express");

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
      res.json(users);
    })
    .post("/", async (req: Request, res: Response) => {
      const user  = req.body;

      usersService.createUser(user);
      res.json(user)
    });
};
