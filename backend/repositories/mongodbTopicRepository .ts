import mongoose from "mongoose";
import { Topic } from "../domain/models";
import { ITopicRepository } from "./interfaces/ITopicRepository";

export class MongoDbTopicRepository implements ITopicRepository {
  constructor(private readonly _repo: mongoose.Model<Topic>) {}
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