import { Request, Response, RouterOptions } from "express";

const HTTP200Ok = (res: Response, body: any) => {
  return res.status(200).json(body);
};

const HTTP500InternalServerError = (res: Response, error: string) => {
  return res.status(500).json({ error });
};

const HTTP400BadRequest = (res: Response, error: string) => {
  return res.status(400).json({ error });
};

const HTTP201Created = (res: Response, resource: any) => {
  return res.status(201).json(resource);
};

export {
  HTTP200Ok,
  HTTP201Created,
  HTTP400BadRequest,
  HTTP500InternalServerError,
};
