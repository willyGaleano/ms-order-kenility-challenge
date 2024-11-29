import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PipelineStage } from 'mongoose';
import { GetLargestOrderQuery } from './largest.query';
import { OrderDetail } from '../../../models/entities/order-detail.entity';
import { OrderQueryRepository } from '../../../repositories/order-query.repository';

@QueryHandler(GetLargestOrderQuery)
export class GetLargestOrderHandler
  implements IQueryHandler<GetLargestOrderQuery>
{
  constructor(private readonly orderRepository: OrderQueryRepository) {}

  async execute(): Promise<OrderDetail> {
    const pipeline: PipelineStage[] = [
      { $sort: { total: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'products',
          localField: 'products',
          foreignField: '_id',
          as: 'products',
        },
      },
      {
        $project: {
          _id: 1,
          customerName: 1,
          total: 1,
          status: 1,
          products: {
            _id: 1,
            name: 1,
            sku: 1,
            imageUrl: 1,
            price: 1,
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    const result = await this.orderRepository.aggregate<OrderDetail>(pipeline);
    return result[0];
  }
}