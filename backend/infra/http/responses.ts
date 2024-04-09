import { Request, Response, RouterOptions } from "express";

const HTTP200Ok = (res: Response, body: any) => {
  return res.status(200).json(body);
};

const HTTP500InternalServerError = (res: Response, error: string, message) => {
  return res.status(500).json({ error, message });
};

const HTTP400BadRequest = (res: Response, error: string, message: string) => {
  return res.status(400).json({ error, message });
};

const HTTP403Forbidden = (res: Response, error: string, message: string) => {
  return res.status(403).json({ error, message });
};

const HTTP201Created = (res: Response, resource: any) => {
  return res.status(201).json(resource);
};

const HTTP401Unauthorized = (res: Response, error: string, message: string) => {
  return res.status(401).json({ error });
};

export {
  HTTP200Ok,
  HTTP201Created,
  HTTP400BadRequest,
  HTTP401Unauthorized,
  HTTP403Forbidden,
  HTTP500InternalServerError,
};
