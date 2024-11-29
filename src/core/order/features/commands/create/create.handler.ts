import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create.command';
import { CreateOrderDto } from '../../../../order/models/dtos/create-order.dto';
import { OrderCommandRepository } from 'src/core/order/repositories/order-command.repository';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderRepository: OrderCommandRepository) {}

  async execute(command: CreateOrderCommand): Promise<string> {
    const { products } = command;
    const total = products.reduce((acc, product) => acc + product.price, 0);

    const order: CreateOrderDto = {
      ...command,
      total,
      products: products.map((product) => product.id),
    };

    return await this.orderRepository.create(order);
  }
}
