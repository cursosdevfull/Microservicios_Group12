import { User } from "@user/domain";
import { plainToInstance } from "class-transformer";

import { UserGetOneResponseDto } from "../../application/responses/user-get-one.dto";
import { UserLoginResponseDto } from "../../application/responses/user-login.dto";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDomainToData(model: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(model)) {
      return model.map((item) => this.fromDomainToData(item)) as UserEntity[];
    }

    const userEntity = plainToInstance(UserEntity, model.properties);
    console.log("UserEntity", userEntity);
    /*     const userEntity = new UserEntity();
    userEntity.userId = model.properties.userId;
    userEntity.name = model.properties.name;
    userEntity.lastname = model.properties.lastname;
    userEntity.email = model.properties.email;
    userEntity.password = model.properties.password;
    userEntity.refreshToken = model.properties.refreshToken;
    userEntity.positionJobs = model.properties.positionJobs;
    userEntity.createdAt = model.properties.createdAt;
    userEntity.updatedAt = model.properties.updatedAt;
    userEntity.deletedAt = model.properties.deletedAt; */

    return userEntity;
  }

  static fromDataToResponse(
    model: UserEntity | UserEntity[]
  ): UserGetOneResponseDto | UserGetOneResponseDto[] {
    if (Array.isArray(model)) {
      return model.map((item) =>
        this.fromDataToResponse(item)
      ) as UserGetOneResponseDto[];
    }

    const response = new UserGetOneResponseDto();
    response.userId = model.userId;
    response.name = model.name;
    response.lastname = model.lastname;
    response.email = model.email;
    response.roles = model.roles.map((role) => ({ roleId: role.roleId }));

    return response;
  }

  static fromDataToResponseLogin(model: UserEntity): UserLoginResponseDto {
    const response = new UserLoginResponseDto();
    response.userId = model.userId;
    response.name = model.name;
    response.lastname = model.lastname;
    response.email = model.email;
    response.password = model.password;
    response.roles = model.roles.map((role) => ({ name: role.name }));
    response.refreshToken = model.refreshToken;

    return response;
  }
}
