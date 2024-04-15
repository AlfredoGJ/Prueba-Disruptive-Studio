import { Post } from "domain/models";
import { IPostRepository } from "./interfaces/IPostRepository";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export class MongoDbPostRepository implements IPostRepository {
  constructor(private readonly _repo: mongoose.Model<Post>) {}
  deletePost(id: string): Promise<any> {
    return this._repo.deleteOne({ _id: new ObjectId(id) });
  }
  updatePost(id: string, post: any): Promise<any> {
    const propsToUpdate = {
      $set: {
        title: post.title,
        topic: post.topic,
        author: post.author,
      },
    };

    if (post.textContent) propsToUpdate.$set["textContent"] = post.textContent;
    if (post.imageContent)
      propsToUpdate.$set["imageContent"] = post.imageContent;
    return this._repo.updateOne({ _id: new ObjectId(id) }, propsToUpdate);
  }
  async existPostById(id: string): Promise<Boolean> {
    const result = await this._repo.exists({ _id: id });
    if (result) return true;
    return false;
  }
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
            name: "$_id",
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
