import {
  CreateProductResponse,
  ProductCreated,
} from '../models/dtos/create-product.dto';
import {
  ProductDetailDBResponse,
  ProductDetailResponse,
} from '../models/dtos/detail-product.dto';

export class ProductControllerMapper {
  static toCreateResponse(product: ProductCreated): CreateProductResponse {
    return {
      data: product,
    };
  }

  static toDetailResponse(
    product: ProductDetailDBResponse,
  ): ProductDetailResponse {
    const { _id, ...restProduct } = product;
    return {
      data: {
        product: {
          id: _id,
          ...restProduct,
        },
      },
    };
  }
}
