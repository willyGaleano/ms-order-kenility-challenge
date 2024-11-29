import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from './update.command';
import { UpdateOrderDto } from '../../../../order/models/dtos/update-order.dto';
import { OrderCommandRepository } from '../../../repositories/order-command.repository';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(private readonly orderRepository: OrderCommandRepository) {}

  async execute(command: UpdateOrderCommand): Promise<string> {
    const { id, status } = command;

    const orderUpdated: UpdateOrderDto = {
      status,
    };

    return await this.orderRepository.update(id, orderUpdated);
  }
}
