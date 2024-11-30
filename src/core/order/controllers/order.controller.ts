import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../features/commands/create/create.command';
import { UpdateOrderCommand } from '../features/commands/update/update.command';
import { OrderDetail } from '../models/entities/order-detail.entity';
import { GetLargestOrderQuery } from '../features/queries/largest/largest.query';
import { GetLastMonthSaleQuery } from '../features/queries/last-month-sale/lasth-month-sale.query';
import { ControllerResponse } from '../../../shared/models/wrappers/response.wrapper';

@Controller('order')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(
    @Body() body: CreateOrderCommand,
  ): Promise<ControllerResponse<{ orderId: string }>> {
    const { customerName, products } = body;
    const orderId = await this.commandBus.execute<CreateOrderCommand, string>(
      new CreateOrderCommand(customerName, products),
    );
    return { data: { orderId } };
  }

  @Put()
  async update(
    @Body() body: UpdateOrderCommand,
  ): Promise<ControllerResponse<{ orderId: string }>> {
    const { id, status } = body;
    const orderId = await this.commandBus.execute<UpdateOrderCommand, string>(
      new UpdateOrderCommand(id, status),
    );
    return { data: { orderId } };
  }

  @Get('largest')
  async largest(): Promise<ControllerResponse<{ order: OrderDetail }>> {
    const order = await this.queryBus.execute<
      GetLargestOrderQuery,
      OrderDetail
    >(new GetLargestOrderQuery());
    return { data: { order } };
  }

  @Get('last-month-sales')
  async lastMonthSales(): Promise<
    ControllerResponse<{
      totalSoldLastMonth: number;
    }>
  > {
    const totalSoldLastMonth = await this.queryBus.execute<
      GetLastMonthSaleQuery,
      number
    >(new GetLastMonthSaleQuery());

    return { data: { totalSoldLastMonth } };
  }
}
