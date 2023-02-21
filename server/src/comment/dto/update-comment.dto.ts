import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateComment {
  @IsBoolean()
  anonymous?: boolean;

  @IsNotEmpty()
  content?: string;

  @IsNotEmpty()
  idieaId?: number;
}