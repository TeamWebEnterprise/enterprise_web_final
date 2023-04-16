import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  username?: string;

  email?: string;

  @IsNotEmpty()
  password: string;
}
