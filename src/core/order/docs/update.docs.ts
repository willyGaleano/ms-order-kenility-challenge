import {
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '../models/dtos/update-order.dto';

export const UPDATE_ORDER_OPERATION = {
  summary: 'Update order status',
};

export const UPDATE_ORDER_PARAM_ID = {
  name: 'id',
  description: 'Order ID',
  type: String,
};

export const UPDATE_ORDER_CONSUMES = 'application/json';

export const UPDATE_ORDER_BODY = {
  type: UpdateOrderRequest,
};

export const UPDATE_ORDER_RESPONSE_SUCCESS = {
  status: 200,
  description: 'The order has been successfully updated.',
  type: UpdateOrderResponse,
};
