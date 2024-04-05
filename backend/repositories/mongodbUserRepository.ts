import mongoose from "mongoose";
import { User } from "../domain/models";
import { IUserRepository } from "./interfaces/IUserRepository";

export class MongoDbUserRepository implements IUserRepository {
  constructor(private readonly _repo: mongoose.Model<User>) {}
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
  getUserByEmail(email: string): User {
    throw new Error("Method not implemented.");
  }
  createUser(user: User): void {
    this._repo.create(user);
  }
}
