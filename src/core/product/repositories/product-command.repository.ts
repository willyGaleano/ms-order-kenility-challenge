import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from '../models/schemas/product.schema';

@Injectable()
export class ProductCommandRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: ProductModel,
  ) {}

  async create<T>(order: T): Promise<string> {
    const productCreated = await this.productModel.create(order);
    return productCreated.id;
  }
}
