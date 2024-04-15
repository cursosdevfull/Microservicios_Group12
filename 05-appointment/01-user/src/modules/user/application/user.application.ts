import { User, UserRepository } from "@user/domain";

import { CypherService } from "../../core/presentation/service/cypher.service";
import {
  UserAuthResponse,
  UserAuthResponseDto,
} from "./responses/user-auth.dto";
import { UserGetOneResponseDto } from "./responses/user-get-one.dto";
import { UserLoginResponseDto } from "./responses/user-login.dto";

//@injectable()
export class UserApplication {
  private repository: UserRepository;

  constructor(/*@inject("UserRepository")*/ repository: UserRepository) {
    this.repository = repository;
  }

  async create(user: User): Promise<User> {
    const userExist = await this.repository.getUserByEmail(
      user.properties.email
    );

    if (userExist) {
      throw new Error("User already exist");
    }

    return await this.repository.saveUser(user);
  }

  async update(user: User): Promise<User> {
    return await this.repository.saveUser(user);
  }

  async delete(user: User): Promise<User> {
    return await this.repository.saveUser(user);
  }

  async getAll(): Promise<User[]> {
    return await this.repository.getAllUsers();
  }

  async getById(id: string): Promise<UserGetOneResponseDto> {
    return await this.repository.getUserById(id);
  }

  async getLogin(email: string, password: string): Promise<UserAuthResponse> {
    const user: UserLoginResponseDto = await this.repository.getUserByEmail(
      email
    );

    if (!user) {
      throw new Error("User not found");
    }

    const passwordValid = await CypherService.compare(password, user.password);

    if (!passwordValid) {
      throw new Error("Password not valid");
    } else {
      return UserAuthResponseDto.fromResponseToLogin(user);
    }
  }

  async getByPage(page: number, pageSize: number): Promise<User[]> {
    return await this.repository.getUsersByPage(1, 10);
  }
}
