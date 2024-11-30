import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from '../models/schemas/product.schema';

@Injectable()
export class ProductQueryRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: ProductModel,
  ) {}

  async findOne<T>(
    filter: Record<string, unknown>,
    projection?: Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Promise<T | null> {
    const product = await this.productModel
      .findOne(filter, projection, options)
      .lean();
    return product as unknown as T;
  }

  async exists(filter: Record<string, unknown>): Promise<boolean> {
    return (await this.productModel.countDocuments(filter)) > 0;
  }
}
