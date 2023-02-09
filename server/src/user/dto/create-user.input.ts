import { IsEmail } from 'class-validator';

export class CreateUserInput {
  username: string;

  password: string;

  firstName: string;

  lastName: string;

  @IsEmail()
  email: string;

  phone: string;

  address: string;

  dateOfBirth?: Date;

  cretedAt?: Date;
}
