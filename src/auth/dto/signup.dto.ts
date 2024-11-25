import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  readonly password: string;
}
