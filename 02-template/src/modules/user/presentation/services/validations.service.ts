import { ValidationService } from "../../../core/presentation/service/validation.service";
import {
  PositionDtoJob,
  UserCreateRequestDto,
} from "../dtos/user-create.request.dto";

export class ValidationsUserService {
  static async create(body: any) {
    const dataToValidate = body;
    dataToValidate.positionJobs = body.positionJobs?.map(
      (position: PositionDtoJob) => {
        const positionJob = new PositionDtoJob();
        positionJob.area = position.area;
        positionJob.position = position.position;
        positionJob.year = position.year;
        return positionJob;
      }
    );

    return await ValidationService.runValidation(body, UserCreateRequestDto);
  }
}
