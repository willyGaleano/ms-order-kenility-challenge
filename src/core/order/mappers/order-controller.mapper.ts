import { OrderTotalSoldLastMonthResponse } from '../models/dtos/aggregate-order.dto';
import {
  CreateOrderResponse,
  OrderCreated,
} from '../models/dtos/create-order.dto';
import {
  OrderDetailDBResponse,
  OrderDetailResponse,
} from '../models/dtos/detail-order.dto';
import {
  UpdatedOrder,
  UpdateOrderResponse,
} from '../models/dtos/update-order.dto';

export class OrderControllerMapper {
  static toCreateResponse(order: OrderCreated): CreateOrderResponse {
    return {
      data: order,
    };
  }

  static toUpdateResponse(order: UpdatedOrder): UpdateOrderResponse {
    return {
      data: order,
    };
  }

  static toLargestResponse(order: OrderDetailDBResponse): OrderDetailResponse {
    return {
      data: {
        order: {
          id: order._id,
          customerName: order.customerName,
          total: order.total,
          status: order.status,
          products: order.products.map((product) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            sku: product.sku,
            imageUrl: product.imageUrl,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          })),
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        },
      },
    };
  }

  static toLastMonthSalesResponse(
    total: number,
  ): OrderTotalSoldLastMonthResponse {
    return {
      data: {
        totalSoldLastMonth: total,
      },
    };
  }
}
