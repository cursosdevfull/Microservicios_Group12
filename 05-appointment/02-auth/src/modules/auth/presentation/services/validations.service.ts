import { ValidationService } from "../../../core/presentation/service/validation.service";
import { AuthLoginDto } from "../dtos/auth-login.dto";

export class ValidationsAuthService {
  static async login(body: any) {
    return await ValidationService.runValidation(body, AuthLoginDto);
  }
}
