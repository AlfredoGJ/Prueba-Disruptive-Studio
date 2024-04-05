import { User } from "../../domain/models";

export interface IUserRepository {
  getUserById(id: string): User;
  getUserByName(name: string): User;
  getUserByEmail(email: string): User;
  createUser(user: User): void;
  getAll(): Promise<User[]>;
  existUser(user:User):Promise<Boolean>;
//   validateUser(user:user):Promise<>
}
