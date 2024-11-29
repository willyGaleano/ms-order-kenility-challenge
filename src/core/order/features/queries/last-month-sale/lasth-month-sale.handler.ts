import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DateTime } from 'luxon';
import { PipelineStage } from 'mongoose';
import { GetLastMonthSaleQuery } from './lasth-month-sale.query';
import { OrderStatus } from '../../../models/enums/order.enum';
import { OrderQueryRepository } from '../../../repositories/order-query.repository';

@QueryHandler(GetLastMonthSaleQuery)
export class GetLastMonthSaleHandler
  implements IQueryHandler<GetLastMonthSaleQuery>
{
  constructor(private readonly orderRepository: OrderQueryRepository) {}

  async execute(): Promise<number> {
    const now = DateTime.now();
    const startOfMonth = now.startOf('month').toJSDate();
    const endOfToday = now.endOf('day').toJSDate();

    const pipeline: PipelineStage[] = [
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfToday },
          status: OrderStatus.COMPLETED,
        },
      },
      {
        $group: {
          _id: null,
          totalSold: { $sum: '$total' },
        },
      },
    ];

    const result = await this.orderRepository.aggregate<{ totalSold: number }>(
      pipeline,
    );
    return result[0]?.totalSold || 0;
  }
}
