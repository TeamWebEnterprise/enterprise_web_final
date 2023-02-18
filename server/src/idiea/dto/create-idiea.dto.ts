export class CreateIdieaDto {
  content: string;

  anonymous: string;

  updatedAt?: string;

  closeIdieaAt?: Date;

  closeCommentAt?: Date;

  idCategory?: number[];
}
