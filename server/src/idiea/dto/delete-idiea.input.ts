import { IsNotEmpty } from 'class-validator';

export class DeleteIdieaDto {
  @IsNotEmpty()
  idieaId: number;
}
