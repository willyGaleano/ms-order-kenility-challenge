import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PipelineStage } from 'mongoose';
import { Order, OrderModel } from '../models/schemas/order.schema';

@Injectable()
export class OrderQueryRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: OrderModel,
  ) {}

  async findOne<T>(
    query: Record<string, unknown>,
    projection?: Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Promise<T> {
    const order = await this.orderModel
      .findOne(query, projection, options)
      .populate('products', 'id name sku imageUrl price', 'Product')
      .lean();
    return order as unknown as T;
  }

  async aggregate<T>(pipeline: PipelineStage[]): Promise<T[]> {
    const orders = await this.orderModel.aggregate(pipeline).exec();
    return orders as unknown as T[];
  }
}
