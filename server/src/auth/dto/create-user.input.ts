import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  dateOfBirth?: Date;

  cretedAt?: Date;

  @IsNotEmpty()
  departmentId: number;
}
