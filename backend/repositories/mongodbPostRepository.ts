import { Post } from "domain/models";
import { IPostRepository } from "./interfaces/IPostRepository";
import mongoose from "mongoose";

export class MongoDbPostRepository implements IPostRepository {
  constructor(private readonly _repo: mongoose.Model<Post>) {}
  queryPosts(
    title: string,
    topic: string,
    type: string,
    pageNumber: number = 0,
    itemsPerPage: number = 5
  ): Promise<Post[]> {
    const query = { $and: [] };
    if (type) query.$and.push({ type: type });
    else query.$and.push({ type: { $regex: /.*/ } });
    if (topic) query.$and.push({ topic: topic });
    else query.$and.push({ topic: { $regex: /.*/ } });
    if (title) {
      query.$and.push({
        title: {
          $regex: `${title}`,
          $options: "i",
        },
      });
    } else query.$and.push({ title: { $regex: /.*/ } });

    return this._repo
      .find(query)
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);
  }

  getAllPosts(): Promise<Post[]> {
    return this._repo.find();
  }
  getAllPostsByType(): Promise<any> {
    return this._repo
      .aggregate([
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
            topics: { $addToSet: "$topic" },
          },
        },
        {
          $project: {
            _id: 0,
            type: "$_id",
            count: 1,
            topics: 1,
          },
        },
      ])
      .exec();
  }

  createPost(post: Post): Promise<Post> {
    return this._repo.create(post);
  }
}
