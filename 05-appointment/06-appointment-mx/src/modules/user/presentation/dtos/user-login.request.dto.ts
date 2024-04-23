import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserLoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}
