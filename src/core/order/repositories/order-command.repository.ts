import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderModel } from '../models/schemas/order.schema';
import { OrderFindByIdAndUpdateParams } from '../models/types/parameter.type';

@Injectable()
export class OrderCommandRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: OrderModel,
  ) {}

  async create<T>(order: T): Promise<string> {
    const orderCreated = await this.orderModel.create(order);
    return orderCreated.id;
  }

  async update(...params: OrderFindByIdAndUpdateParams): Promise<string> {
    const [id, order] = params;
    const orderUpdated = await this.orderModel
      .findByIdAndUpdate(id, order)
      .lean();
    return orderUpdated._id.toString();
  }
}
