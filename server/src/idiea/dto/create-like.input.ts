import { IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  idieaId: number;

  @IsNotEmpty()
  positive: string;
}
