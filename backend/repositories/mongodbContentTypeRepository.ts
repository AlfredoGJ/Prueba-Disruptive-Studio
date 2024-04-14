import { ContentType } from "domain/models";
import { IContentTypeRepository } from "./interfaces/IContentTypeRepository";
import mongoose from "mongoose";

import { ObjectId } from "mongodb";

export class MongoDbContentTypeRepository implements IContentTypeRepository {
  constructor(private readonly _repo: mongoose.Model<ContentType>) {}
  deleteContentType(id: string): Promise<any> {
    return this._repo.deleteOne({ _id: new ObjectId(id) });
  }
  updataContentType(id: string, contentType: ContentType): Promise<any> {

    return this._repo.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          description: contentType.description,
          name: contentType.name,
          type: contentType.name,
        },
      }
    );
  }

  createContentType(contentType: ContentType): Promise<ContentType> {
    return this._repo.create(contentType);
  }
  getAllContentTypes(): Promise<ContentType[]> {
    return this._repo.find();
  }
  async existContentTypeByName(name: string): Promise<Boolean> {
    const result = await this._repo.exists({ name: name });
    if (result) return true;
    return false;
  }
  async existContentTypeById(id: string): Promise<Boolean> {
    const result = await this._repo.exists({ _id: id });
    if (result) return true;
    return false;
  }
}
