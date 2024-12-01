import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { CreateOrderCommand } from './create.command';
import {
  CreateOrderDto,
  OrderCreated,
} from '../../../../order/models/dtos/create-order.dto';
import { OrderCommandRepository } from '../../../repositories/order-command.repository';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderRepository: OrderCommandRepository) {}

  async execute(command: CreateOrderCommand): Promise<OrderCreated> {
    const { products } = command;
    const total = products.reduce((acc, product) => acc + product.price, 0);

    const order: CreateOrderDto = {
      ...command,
      total,
      products: products.map((product) => new Types.ObjectId(product.id)),
    };

    const orderId = await this.orderRepository.create(order);
    return { orderId };
  }
}
