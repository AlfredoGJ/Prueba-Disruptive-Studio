import mongoose from "mongoose";
import { User } from "../domain/models";
import { IUserRepository } from "./interfaces/IUserRepository";

import { ObjectId } from "mongodb";

export class MongoDbUserRepository implements IUserRepository {
  constructor(private readonly _repo: mongoose.Model<User>) {}
  deleteUser(id: string): Promise<any> {
    return this._repo.deleteOne({ _id: new ObjectId(id) });
  }
  updateUser(id: string, topic: User): Promise<any> {
    return this._repo.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: topic.name,
          email: topic.email,
          type: topic.type,
        },
      }
    );
  }
  async existUserById(id: string): Promise<Boolean> {
    const result = this._repo.exists({ _id: id });
    if (result) return true;
    return false;
  }
  async existUserWithEmail(email: string): Promise<Boolean> {
    let exists = await this._repo.exists({ email: email });
    if (exists) return true;
    return false;
  }
  async existUserWithName(name: string): Promise<Boolean> {
    let exists = await this._repo.exists({ name: name });
    if (exists) return true;
    return false;
  }
  async getAll(): Promise<User[]> {
    const result = await this._repo.find();
    return result;
  }
  getUserById(id: string): User {
    throw new Error("Method not implemented.");
  }
  getUserByName(name: string): User {
    throw new Error("Method not implemented.");
  }
  async getUserByEmail(email: string): Promise<User> {
    return this._repo.findOne({ email: email });
  }
  createUser(user: User): void {
    this._repo.create(user);
  }
}
