import { FileToUpload } from '../../../../../shared/file/models/types/upload.type';

export class CreateProductCommand {
  constructor(name: string, sku: string, price: number, file: FileToUpload) {
    this.name = name;
    this.sku = sku;
    this.price = price;
    this.file = file;
  }

  name: string;
  sku: string;
  price: number;
  file: FileToUpload;
}
