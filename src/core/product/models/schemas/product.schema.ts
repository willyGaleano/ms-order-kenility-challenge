import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, index: true, maxlength: 100 })
  name: string;

  @Prop({
    required: true,
    unique: true,
    maxlength: 50,
    uppercase: true,
    trim: true,
  })
  sku: string;

  @Prop({ required: true, maxlength: 500 })
  imageUrl: string;

  @Prop({ required: true, type: Number, min: 0 })
  price: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ sku: 1, name: 1 }, { unique: true });
