import { User, UserRepository } from "@user/domain";
import { inject, injectable } from "inversify";

@injectable()
export class UserApplication {
  private repository: UserRepository;

  constructor(@inject("UserRepository") repository: UserRepository) {
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

  async getById(id: number): Promise<User> {
    return await this.repository.getUserById(id);
  }

  async getByPage(page: number, pageSize: number): Promise<User[]> {
    return await this.repository.getUsersByPage(1, 10);
  }
}
