import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {
  ALLOWED_IMAGE_MIMETYPES_DEFAULT,
  IMAGE_FILE_MAX_SIZE_DEFAULT,
} from '../constants/file.constant';

export interface MulterFile {
  mimetype: string;
}

export interface Callback {
  (error: Error | null, acceptFile: boolean): void;
}

export const multerImageOptions: MulterOptions = {
  limits: {
    fileSize: +process.env.IMAGE_FILE_MAX_SIZE || IMAGE_FILE_MAX_SIZE_DEFAULT,
  },
  fileFilter: (_: any, file: MulterFile, cb: Callback) => {
    const allowedMimesEnv: string = process.env.ALLOWED_IMAGE_MIMETYPES;
    const allowedMimes: string[] = allowedMimesEnv
      ? allowedMimesEnv.split(',')
      : ALLOWED_IMAGE_MIMETYPES_DEFAULT;

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Invalid file type. Only ${allowedMimes.join(', ')} files are allowed.`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
};
