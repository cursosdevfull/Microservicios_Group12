import { DatabaseBootstrap } from "@bootstrap";
import { User, UserRepository } from "@user/domain";

import { UserGetOneResponseDto } from "../application/responses/user-get-one.dto";
import { UserLoginResponseDto } from "../application/responses/user-login.dto";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

//@injectable()
export class UserInfrastructure implements UserRepository {
  async saveUser(user: User): Promise<User> {
    const repository = DatabaseBootstrap.dataSource.getRepository("UserEntity");
    const userEntity = UserDto.fromDomainToData(user) as UserEntity;

    await repository.save(userEntity);

    return await Promise.resolve(user);
  }
  async getUserById(id: string): Promise<UserGetOneResponseDto> {
    const repository = DatabaseBootstrap.dataSource.getRepository("UserEntity");

    const userEntity = (await repository.findOne({
      where: { userId: id },
      relations: ["roles"],
    })) as UserEntity;

    console.log("UserEntity", userEntity);
    const user = UserDto.fromDataToResponse(
      userEntity
    ) as UserGetOneResponseDto;
    console.log("User", user);
    return user;
  }

  async getUserByEmail(email: string): Promise<UserLoginResponseDto> {
    const repository = DatabaseBootstrap.dataSource.getRepository("UserEntity");

    const userEntity = (await repository.findOne({
      where: { email },
      relations: ["roles"],
    })) as UserEntity;

    if (!userEntity) return null;

    const user = UserDto.fromDataToResponseLogin(
      userEntity
    ) as UserLoginResponseDto;
    return user;
  }

  getAllUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  getUsersByPage(page: number, limit: number): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
