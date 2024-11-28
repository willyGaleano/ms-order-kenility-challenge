import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../../../product/models/schemas/product.schema';
import { OrderStatus } from '../enums/order.enum';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, index: true, maxlength: 100 })
  customerName: string;

  @Prop({ required: true, type: Number, min: 0 })
  total: number;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }],
    required: true,
  })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
