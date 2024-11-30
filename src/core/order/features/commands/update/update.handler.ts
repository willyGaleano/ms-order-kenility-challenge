import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from './update.command';
import {
  UpdatedOrder,
  UpdateOrderDto,
} from '../../../../order/models/dtos/update-order.dto';
import { OrderCommandRepository } from '../../../repositories/order-command.repository';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(private readonly orderRepository: OrderCommandRepository) {}

  async execute(command: UpdateOrderCommand): Promise<UpdatedOrder> {
    const { id, status } = command;

    const orderUpdated: UpdateOrderDto = {
      status,
    };

    const orderId = await this.orderRepository.update(id, orderUpdated);
    return { orderId };
  }
}
