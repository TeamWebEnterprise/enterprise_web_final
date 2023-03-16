import { IsNotEmpty, IsNumber } from 'class-validator';

export class MakeIdieaPublishDto {
  @IsNotEmpty()
  idieaId: number;
}
