import mongoose from "mongoose";
import { Topic } from "../domain/models";
import { ITopicRepository } from "./interfaces/ITopicRepository";
import { ObjectId } from "mongodb";

const { Binary } = mongoose.mongo;

export class MongoDbTopicRepository implements ITopicRepository {
  constructor(private readonly _repo: mongoose.Model<Topic>) {}
  async existTopicByName(name: string): Promise<Boolean> {
    const result = await this._repo.exists({ name });
    if (result) return true;
    return false;
  }
  deleteTopic(id: string): Promise<any> {
    return this._repo.deleteOne({ _id: new ObjectId(id) });
  }
  updateTopic(id: string, topic: Topic): Promise<any> {
    const propsToUpdate = {
      $set: {
        name: topic.name,
        allowedContent: topic.allowedContent,
      },
    };
    if (topic.cover) propsToUpdate.$set["cover"] = topic.cover;
    return this._repo.updateOne({ _id: new ObjectId(id) }, propsToUpdate);
  }
  async existTopicById(id: string): Promise<Boolean> {
    const result = await this._repo.exists({ _id: id });
    if (result) return true;
    return false;
  }
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
          cover: 1,
          allowedContent: 1,
          posts: { $size: "$posts" },
        },
      },
    ]);
  }
  getTopicsThatAcceptsContent(contentType: string): Promise<Topic[]> {
    // return this._repo.find({ allowedContent: contentType }, { cover: 0 });

    return this._repo
      .aggregate([
        {
          $unwind: "$allowedContent",
        },
        {
          $lookup: {
            from: "contenttypes",
            localField: "allowedContent",
            foreignField: "name",
            as: "allowedContentType",
          },
        },
        { $unwind: "$allowedContentType" },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            allowedContent: { $addToSet: "$allowedContentType.type" },
          },
        },
        {
          $project: {
            cover: 0,
          },
        },
      ])
      .then((topics) => {
        return topics.filter((topic) =>
          topic.allowedContent.includes(contentType)
        );
      });
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
