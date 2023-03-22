import { IsNotEmpty } from 'class-validator';

export class SetUserDepartmentDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  departmentId: number;
}
