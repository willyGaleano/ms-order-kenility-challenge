import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, index: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 100 })
  lastname: string;

  @Prop({ required: true, unique: true, maxlength: 50 })
  email: string;

  @Prop({ required: true, maxlength: 250 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
