import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order.enum';
import { ControllerResponse } from '../../../../shared/models/wrappers/response.wrapper';

export class UpdateOrderRequest {
  @ApiProperty({
    description: 'The status of the order',
    enum: OrderStatus,
    example: OrderStatus.COMPLETED,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class UpdateOrderDto {
  status: OrderStatus;
}

export class UpdatedOrder {
  orderId: string;
}

export class UpdateOrderResponse extends ControllerResponse<UpdatedOrder> {}
