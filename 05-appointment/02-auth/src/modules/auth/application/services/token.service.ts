import { Parameters } from "@core";
import jwt from "jsonwebtoken";

export class TokenService {
  static generateToken(
    userId: string,
    name: string,
    lastname: string,
    email: string,
    roles: { name: string }[]
  ): string {
    const accessToken = jwt.sign(
      {
        userId,
        name,
        lastname,
        email,
        roles,
      },
      Parameters.tokenSecret,
      { expiresIn: Parameters.tokenExpiration }
    );

    return accessToken;
  }
}
