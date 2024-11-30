import { PipeTransform, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

export class ParseMongoIdPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!isMongoId(value)) {
      throw new BadRequestException('Invalid MongoDB ID');
    }
    return value;
  }
}
