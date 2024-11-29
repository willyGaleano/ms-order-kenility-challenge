import { Module } from '@nestjs/common';
import { AwsModule } from './providers/aws/aws.module';
import { UPLOAD_FILE_SERVICE } from './models/interfaces/upload-file.interface';
import { UploadFileService } from './services/upload-file.service';

@Module({
  imports: [AwsModule],
  providers: [
    {
      provide: UPLOAD_FILE_SERVICE,
      useClass: UploadFileService,
    },
    UploadFileService,
  ],
  exports: [UPLOAD_FILE_SERVICE],
})
export class FileModule {}
