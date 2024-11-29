import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from 'src/core/order/models/enums/order.enum';

export class UpdateOrderCommand {
  constructor(id: string, status: OrderStatus) {
    this.id = id;
    this.status = status;
  }

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
