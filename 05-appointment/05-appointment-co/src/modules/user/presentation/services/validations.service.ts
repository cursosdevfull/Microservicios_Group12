import { ValidationService } from "../../../core/presentation/service/validation.service";
import { UserCreateRequestDto } from "../dtos/user-create.request.dto";
import { UserGetOneRequestDto } from "../dtos/user-get-one.request.dto";
import { UserLoginRequestDto } from "../dtos/user-login.request.dto";

export class ValidationsUserService {
  static async create(body: any) {
    return await ValidationService.runValidation(body, UserCreateRequestDto);
  }

  static async getOne(params: any) {
    return await ValidationService.runValidation(params, UserGetOneRequestDto);
  }

  static async getLogin(body: any) {
    return await ValidationService.runValidation(body, UserLoginRequestDto);
  }
}
