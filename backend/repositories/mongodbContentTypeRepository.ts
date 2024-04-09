import { ContentType } from "domain/models";
import { IContentTypeRepository } from "./interfaces/IContentTypeRepository";
import mongoose from "mongoose";

export class MongoDbContentTypeRepository implements IContentTypeRepository {
  constructor(private readonly _repo: mongoose.Model<ContentType>) {}

  createContentType(contentType: ContentType): Promise<ContentType> {
    return this._repo.create(contentType);
  }
  getAllContentTypes(): Promise<ContentType[]> {
    return this._repo.find();
  }
  async existContentType(name: string): Promise<Boolean> {
    const result = await this._repo.exists({ name: name });
    if (result) return true;
    return false;
  }
}
