import { Post } from "domain/models";
import { IPostRepository } from "./interfaces/IPostRepository";
import mongoose from "mongoose";

export class MongoDbPostRepository implements IPostRepository {
  constructor(private readonly _repo: mongoose.Model<Post>) {}

  createPost(post: Post): Promise<Post> {
    return this._repo.create(post);
  }
}
