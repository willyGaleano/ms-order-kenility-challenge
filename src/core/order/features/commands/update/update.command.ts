import { OrderStatus } from 'src/core/order/models/enums/order.enum';

export class UpdateOrderCommand {
  constructor(
    public readonly id: string,
    public readonly status: OrderStatus,
  ) {}
}
