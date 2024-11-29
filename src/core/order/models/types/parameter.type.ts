import { Model } from 'mongoose';
import { OrderDocument } from '../schemas/order.schema';

//export type OrderFindOneParams = Parameters<Model<OrderDocument>['findOne']>;
export type OrderFindByIdAndUpdateParams = Parameters<
  Model<OrderDocument>['findByIdAndUpdate']
>;
