import { IsNotEmpty } from 'class-validator';

export class ForGotPassWordDto {
  @IsNotEmpty()
  emailConfirm: string;
}
