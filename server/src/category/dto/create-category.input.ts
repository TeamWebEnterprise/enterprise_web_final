import { IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty()
  categoryName: string;

  description?: string;
}
