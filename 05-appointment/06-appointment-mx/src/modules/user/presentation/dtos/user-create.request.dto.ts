import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';


export class RoleDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  roleId: string;
}

export class UserCreateRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: RoleDto[];
}
