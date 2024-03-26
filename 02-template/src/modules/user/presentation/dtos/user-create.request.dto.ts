import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

export class PositionDtoJob {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  area: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  position: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1980)
  year: number;
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
  @Type(() => PositionDtoJob)
  positionJobs: PositionDtoJob[];
}
