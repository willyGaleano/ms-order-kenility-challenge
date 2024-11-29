import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { Order, OrderSchema } from './models/schemas/order.schema';
import { CreateOrderHandler } from './features/commands/create/create.handler';
import { UpdateOrderHandler } from './features/commands/update/update.handler';
import { GetLargestOrderHandler } from './features/queries/largest/largest.handler';
import { GetLastMonthSaleHandler } from './features/queries/last-month-sale/lasth-month-sale.handler';
import { OrderController } from './controllers/order.controller';
import { OrderQueryRepository } from './repositories/order-query.repository';
import { OrderCommandRepository } from './repositories/order-command.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CqrsModule,
  ],
  providers: [
    OrderQueryRepository,
    OrderCommandRepository,
    CreateOrderHandler,
    UpdateOrderHandler,
    GetLargestOrderHandler,
    GetLastMonthSaleHandler,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
