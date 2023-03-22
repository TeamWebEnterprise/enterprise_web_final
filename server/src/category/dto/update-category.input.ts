import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  id: number;

  categoryName?: string;

  description?: string;
}
