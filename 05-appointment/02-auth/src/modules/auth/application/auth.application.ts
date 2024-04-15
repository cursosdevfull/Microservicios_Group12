import { AuthRepository } from "../domain/repositories/auth.repository";
import { TokenService } from "./services/token.service";

export class AuthApplication {
  constructor(private readonly repository: AuthRepository) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.repository.getUserByCredentials(email, password);
    if (!user) {
      return null;
    }

    const accessToken = TokenService.generateToken(
      user.userId,
      user.name,
      user.lastname,
      user.email,
      user.roles
    );

    return {
      accessToken,
      refreshToken: user.refreshToken,
    };
  }
}
