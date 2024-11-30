import { IsMongoId } from 'class-validator';

export class ProductDetailQuery {
  constructor(id: string) {
    this.id = id;
  }

  @IsMongoId()
  id: string;
}
