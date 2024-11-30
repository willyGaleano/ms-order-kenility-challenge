import { ProductCreateOrder } from '../../../models/dtos/create-order.dto';

export class CreateOrderCommand {
  constructor(
    public readonly customerName: string,
    public readonly products: ProductCreateOrder[],
  ) {}
}
