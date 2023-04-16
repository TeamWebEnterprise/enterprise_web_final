import { IsNotEmpty } from 'class-validator';

export class SetQAManagerDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  departmentId: number;
}
