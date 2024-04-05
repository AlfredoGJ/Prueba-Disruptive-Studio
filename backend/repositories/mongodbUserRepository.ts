import mongoose from "mongoose";
import { User } from "../domain/models";
import { IUserRepository } from "./interfaces/IUserRepository";

export class MongoDbUserRepository implements IUserRepository {
  constructor(private readonly _repo: mongoose.Model<User>) {}
  existUser(user: User): Promise<Boolean> {
    throw new Error("Method not implemented.");
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
  getUserByEmail(email: string): User {
    throw new Error("Method not implemented.");
  }
  createUser(user: User): void {
    this._repo.create(user);
  }
}
