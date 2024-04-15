import { AuthRepository } from "../domain/repositories/auth.repository";
import { HttpRepository } from "./adapters/http.repository";

export class AuthInfrastructure implements AuthRepository {
  constructor(private httpRepository: HttpRepository) {}

  async getUserByCredentials(email: string, password: string) {
    return await this.httpRepository.login(email, password);
  }
}
