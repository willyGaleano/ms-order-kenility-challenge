import { Module } from '@nestjs/common';
import { UploadFileS3Service } from './services/s3.service';

@Module({
  providers: [UploadFileS3Service],
  exports: [UploadFileS3Service],
})
export class AwsModule {}
