import {
  ProductDetailDBResponse,
  ProductWithoutId,
} from '../../../product/models/dtos/detail-product.dto';
import { ControllerResponse } from '../../../../shared/models/wrappers/response.wrapper';

export class ProductOrderDetail extends ProductWithoutId {
  id: string;
}

export class OrderWithoutId {
  customerName: string;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderDetailDBResponse extends OrderWithoutId {
  _id: string;
  products: ProductDetailDBResponse[];
}

export class OrderDetail {
  order: OrderWithoutId & { id: string; products: ProductOrderDetail[] };
}

export class OrderDetailResponse extends ControllerResponse<OrderDetail> {}
