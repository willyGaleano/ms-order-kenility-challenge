import { Injectable } from '@nestjs/common';
import { IUploadFileService } from '../models/interfaces/upload-file.interface';
import {
  FileToUpload,
  UploadedFileResponse,
} from '../models/types/upload.type';
import { UploadFileS3Service } from '../providers/aws/services/s3.service';

@Injectable()
export class UploadFileService implements IUploadFileService {
  constructor(private readonly uploadFileS3Service: UploadFileS3Service) {}

  async upload(
    file: FileToUpload,
    folder: string,
  ): Promise<UploadedFileResponse> {
    const url = await this.uploadFileS3Service.uploadFile(file, folder);
    return { url };
  }
}
