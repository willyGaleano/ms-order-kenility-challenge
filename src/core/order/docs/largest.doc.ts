import { OrderDetailResponse } from '../models/dtos/detail-order.dto';

export const LARGEST_OPERATION = {
  summary: 'Get the largest number',
};

export const LARGEST_RESPONSE_SUCCESS = {
  status: 200,
  description: 'The largest order has been successfully retrieved.',
  type: OrderDetailResponse,
};
