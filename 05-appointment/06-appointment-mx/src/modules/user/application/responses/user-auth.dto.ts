import { UserLoginResponseDto } from "./user-login.dto";

export class UserAuthResponse {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  roles: { name: string }[];
}

export class UserAuthResponseDto {
  static fromResponseToLogin(model: UserLoginResponseDto): UserAuthResponse {
    const response = new UserAuthResponse();
    response.userId = model.userId;
    response.name = model.name;
    response.lastname = model.lastname;
    response.email = model.email;
    response.roles = model.roles;

    return response;
  }
}
