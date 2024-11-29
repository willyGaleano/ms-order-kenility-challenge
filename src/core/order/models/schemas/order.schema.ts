import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { OrderStatus } from '../enums/order.enum';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, maxlength: 100 })
  customerName: string;

  @Prop({ required: true, index: true, type: Number, min: 0 })
  total: number;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }],
    required: true,
  })
  products: Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document;
export type OrderModel = Model<OrderDocument>;
