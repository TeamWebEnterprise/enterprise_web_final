import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_KEY,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
        ACL: 'public-read',
      })
      .promise();

    return this.prisma.document.create({
      data: {
        key: uploadResult.Key,
        url: uploadResult.Location,
      },
    });
  }

  async uploadFileWithIdieaPost(
    dataBuffer: Buffer,
    filename: string,
    idieaId: number,
  ) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_KEY,
        Body: dataBuffer,
        Key: `${filename}-${uuid()}`,
        ACL: 'public-read',
      })
      .promise();
    return this.prisma.document.create({
      data: {
        key: uploadResult.Key,
        url: uploadResult.Location,
        idieaId: idieaId,
      },
    });
  }
}
