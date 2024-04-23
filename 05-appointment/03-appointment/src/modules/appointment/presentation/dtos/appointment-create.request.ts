import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AppointmentCreateRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  appointmentId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  patientId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  centerId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  specialtyId: string;

  @IsNotEmpty()
  @IsString()
  appointmentDate: string;

  @IsNotEmpty()
  @IsString()
  appointmentTime: string;

  @IsNotEmpty()
  @IsString()
  appointmentStatus: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}
