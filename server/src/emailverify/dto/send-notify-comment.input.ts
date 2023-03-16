import { DateTime } from 'aws-sdk/clients/devicefarm';

export class SendNodetifyForCommnentDto {
  userId: number;

  userCommentId: number;

  content: string;

  createdAt: DateTime;
}
