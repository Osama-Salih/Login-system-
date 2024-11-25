import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  password: string;
}
