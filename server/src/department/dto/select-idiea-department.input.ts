import { IsNotEmpty } from 'class-validator';

export class SelectIdieaDepartmentDto {
  @IsNotEmpty()
  departmentId: number;

  @IsNotEmpty()
  userId: number;
}
