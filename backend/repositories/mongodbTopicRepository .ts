import mongoose from "mongoose";
import { Topic } from "../domain/models";
import { ITopicRepository } from "./interfaces/ITopicRepository";

export class MongoDbTopicRepository implements ITopicRepository {
  constructor(private readonly _repo: mongoose.Model<Topic>) {}
  getAllTopicsWithContentCount(): Promise<Topic[]> {
    return this._repo.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "name",
          foreignField: "topic",
          as: "posts",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          cover:1,
          allowedContent: 1,
          posts: { $size: "$posts" },
        },
      },
    ]);
  }
  getTopicsThatAcceptsContent(contentType: string): Promise<Topic[]> {
    return this._repo.find({ allowedContent: contentType }, { cover: 0 });
  }
  getTopicByName(name: string): Promise<Topic> {
    return this._repo.findOne({ name: name });
  }
  getTopicById(id: string): Promise<Topic> {
    return this._repo.findById(id);
  }
  async createTopic(topic: Topic): Promise<void> {
    this._repo.create(topic);
  }
  async getAllTopics(): Promise<Topic[]> {
    return this._repo.find();
  }
  async existTopic(name: string): Promise<Boolean> {
    let exists = await this._repo.exists({ name: name });
    if (exists) return true;
    return false;
  }
}
