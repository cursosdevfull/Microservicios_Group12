import { ValidationService } from "../../../core/presentation/service/validation.service";
import { AppointmentCreateRequestDto } from "../dtos/appointment-create.request";

export class ValidationsService {
  static async create(body: any) {
    return await ValidationService.runValidation(
      body,
      AppointmentCreateRequestDto
    );
  }
}
