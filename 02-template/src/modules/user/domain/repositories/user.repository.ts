import { User } from "@user/domain";

export interface UserRepository {
  getUserByEmail(email: string): Promise<User>;
  saveUser(user: User): Promise<User>;
  getUserById(id: number): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUsersByPage(page: number, limit: number): Promise<User[]>;
}
