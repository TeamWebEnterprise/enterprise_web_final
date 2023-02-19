import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AddComment {
  @IsBoolean()
  anonymous: boolean;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  idieaId: number;
}

export class UserName extends AddComment {
  @IsNotEmpty()
  userName: string;
}
