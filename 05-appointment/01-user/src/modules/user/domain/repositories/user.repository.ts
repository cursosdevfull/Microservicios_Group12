import { User } from "@user/domain";

import { UserGetOneResponseDto } from "../../application/responses/user-get-one.dto";
import { UserLoginResponseDto } from "../../application/responses/user-login.dto";

export interface UserRepository {
  saveUser(user: User): Promise<User>;
  getUserById(id: string): Promise<UserGetOneResponseDto>;
  getAllUsers(): Promise<User[]>;
  getUsersByPage(page: number, limit: number): Promise<User[]>;
  getUserByEmail(email: string): Promise<UserLoginResponseDto>;
}
