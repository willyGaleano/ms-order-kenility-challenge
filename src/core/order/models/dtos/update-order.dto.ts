import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../enums/order.enum';
import { ControllerResponse } from 'src/shared/models/wrappers/response.wrapper';

export class UpdateOrderRequest {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}

export class UpdateOrderDto {
  status: OrderStatus;
}

export class UpdatedOrder {
  orderId: string;
}

export class UpdateOrderResponse extends ControllerResponse<UpdatedOrder> {}
