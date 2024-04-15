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
import { Authx } from "middleware/AuthX";
import { UserType } from "domain/models";
import { IContentTypeRepository } from "repositories/interfaces/IContentTypeRepository";
import contentTypeSchema from "infra/db/scheemas/contentType";

export const ContentTypeController = (
  options: RouterOptions,
  contentTypeRepository: IContentTypeRepository
) => {
  return express
    .Router(options)
    .get("/", async (req: Request, res: Response) => {
      try {
        const contentTypes = await contentTypeRepository.getAllContentTypes();
        return HTTP200Ok(res, contentTypes);
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
      Authx([UserType.ADMIN]),
      modelValidator(contentTypeSchema),
      async (req: Request & { user }, res: Response) => {
        try {
          const { contentType } = req.body;
          const existsContentType =
            await contentTypeRepository.existContentTypeByName(
              contentType.name
            );
          if (existsContentType)
            return HTTP400BadRequest(
              res,
              "Bad Request",
              "Content type with the same name already exists"
            );

          contentTypeRepository.createContentType(contentType);
          return HTTP201Created(res, contentType);
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
          const existsContentType =
            await contentTypeRepository.existContentTypeById(id);
          if (!existsContentType)
            return HTTP400BadRequest(
              res,
              "Bad Request",
              "Content type does not exist"
            );

          await contentTypeRepository.deleteContentType(id);
          return HTTP200Ok(res, "Content type deleted succesfully");
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
      modelValidator(contentTypeSchema),
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const { contentType } = req.body;
          const existsContentType =
            await contentTypeRepository.existContentTypeById(id);
          if (!existsContentType)
            return HTTP400BadRequest(
              res,
              "Bad Request",
              "Content type does not exist"
            );

          await contentTypeRepository.updataContentType(id, contentType);
          return HTTP200Ok(res, "Content type deleted succesfully");
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
