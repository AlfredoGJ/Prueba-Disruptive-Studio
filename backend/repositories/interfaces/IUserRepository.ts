import { User } from "../../domain/models";

export interface IUserRepository {
  getUserById(id: string): User;
  getUserByName(name: string): User;
  getUserByEmail(email: string): Promise<User>;
  createUser(user: User): void;
  getAll(): Promise<User[]>;
  existUserWithName(name: string): Promise<Boolean>;
  existUserWithEmail(email: string): Promise<Boolean>;
  deleteUser(id: string): Promise<Boolean>;
  updateUser(id: string, topic: User): Promise<any>;
  existUserById(id: string): Promise<Boolean>;
}
