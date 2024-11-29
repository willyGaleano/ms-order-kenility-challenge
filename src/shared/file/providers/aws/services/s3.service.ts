import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { EnvironmentVariablesType } from '../../../../config/models/types/env-vars.type';

@Injectable()
export class UploadFileS3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariablesType>,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const fileKey = `${folder}/${uuidv4()}-${file.originalname}`;

    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3Client.send(new PutObjectCommand(params));
    return this.getFileUrl(fileKey);
  }

  private getFileUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
