import { User } from "@user/domain";
import { plainToInstance } from "class-transformer";

import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDomainToData(model: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(model)) {
      return model.map((item) => this.fromDomainToData(item)) as UserEntity[];
    }

    const userEntity = plainToInstance(UserEntity, model.properties);
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
}
