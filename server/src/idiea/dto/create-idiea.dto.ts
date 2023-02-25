import { CategoryDetail } from '@prisma/client';

export class CreateIdieaDto {
  content: string;

  anonymous: boolean;

  updatedAt?: string;

  closeIdieaAt?: Date;

  closeCommentAt?: Date;
}
