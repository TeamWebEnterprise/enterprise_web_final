import { IsNotEmpty } from 'class-validator';

export class SelectIdieaDepartmentDto {
  @IsNotEmpty()
  userId: number;
}
