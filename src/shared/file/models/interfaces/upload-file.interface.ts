import { FileToUpload, UploadedFileResponse } from '../types/upload.type';

export const UPLOAD_FILE_SERVICE = 'UPLOAD_FILE_SERVICE';

export interface IUploadFileService {
  upload(file: FileToUpload, folder: string): Promise<UploadedFileResponse>;
}
