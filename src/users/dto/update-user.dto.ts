import { IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password?: string;

  @IsString()
  lastname?: string;

  @IsString()
  firstname?: string;
}
