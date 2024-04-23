import { inject, injectable } from "inversify";

import { AuthRepository } from "../domain/repositories/auth.repository";
import { HttpRepository } from "./adapters/http.repository";

@injectable()
export class AuthInfrastructure implements AuthRepository {
  constructor(
    @inject("HttpRepository") private httpRepository: HttpRepository
  ) {}

  async getUserByCredentials(email: string, password: string) {
    return await this.httpRepository.login(email, password);
  }
}
