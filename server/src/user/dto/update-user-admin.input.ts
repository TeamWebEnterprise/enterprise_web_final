import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  roles: string[];
}
