import { OrderStatus } from '../enums/order.enum';

export class UpdateOrderDto {
  status: OrderStatus;
}
