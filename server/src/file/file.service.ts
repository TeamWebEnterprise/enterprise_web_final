import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Repository } from 'aws-sdk/clients/codedeploy';
import { PublicFileDto } from './dto/public-file.input';

@Injectable()
export class FileService {
  constructor() {}
}
