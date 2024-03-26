import { DatabaseBootstrap } from "@bootstrap";
import { User, UserRepository } from "@user/domain";

import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

//@injectable()
export class UserInfrastructure implements UserRepository {
  async getUserByEmail(email: string): Promise<User> {
    //throw new Error("Method not implemented.");
    return null;
  }
  async saveUser(user: User): Promise<User> {
    const repository = DatabaseBootstrap.dataSource.getRepository("UserEntity");
    const userEntity = UserDto.fromDomainToData(user) as UserEntity;

    await repository.save(userEntity);

    return await Promise.resolve(user);
  }
  getUserById(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getAllUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  getUsersByPage(page: number, limit: number): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
