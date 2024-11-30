import { ControllerResponse } from '../../../../shared/models/wrappers/response.wrapper';

export class ProductWithoutId {
  name: string;
  sku: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductDetailDBResponse extends ProductWithoutId {
  _id: string;
}

export class ProductDetail {
  product: ProductWithoutId & { id: string };
}

export class ProductDetailResponse extends ControllerResponse<ProductDetail> {}
