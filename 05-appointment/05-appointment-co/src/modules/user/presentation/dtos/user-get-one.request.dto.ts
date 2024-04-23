import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserGetOneRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
