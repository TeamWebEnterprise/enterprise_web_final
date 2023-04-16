import { IsNotEmpty } from 'class-validator';

export class UpdateIdieaDto {
  @IsNotEmpty()
  idieaId: number;

  content: string;

  anonymous: string;

  closeIdieaAt?: Date;

  closeCommentAt?: Date;

  idCategory?: number[];
}
