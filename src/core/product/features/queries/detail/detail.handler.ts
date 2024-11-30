import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';
import { ProductDetailQuery } from './detail.query';
import { ProductQueryRepository } from '../../../repositories/product-query.repository';
import { ProductErrorCode } from '../../../models/enums/error-code.enum';
import { ProductDetailDBResponse } from '../../../models/dtos/detail-product.dto';

@QueryHandler(ProductDetailQuery)
export class ProductDetailHandler implements IQueryHandler<ProductDetailQuery> {
  private readonly logger = new Logger(ProductDetailHandler.name);

  constructor(private readonly productRepository: ProductQueryRepository) {}

  async execute(query: ProductDetailQuery): Promise<ProductDetailDBResponse> {
    const { id } = query;

    const filter = {
      _id: id,
    };

    const projection = {
      _id: 1,
      name: 1,
      price: 1,
      sku: 1,
      imageUrl: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    this.logger.debug({
      msg: 'Executing query',
      filter,
    });

    const product =
      await this.productRepository.findOne<ProductDetailDBResponse>(
        filter,
        projection,
      );

    if (!product)
      throw new NotFoundException(ProductErrorCode.PRODUCT_NOT_FOUND);

    this.logger.debug({
      msg: 'Query executed',
      product,
    });

    return product;
  }
}
