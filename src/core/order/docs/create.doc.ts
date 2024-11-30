import { HttpStatus } from '@nestjs/common';
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from '../models/dtos/create-order.dto';

export const CREATE_ORDER_TAGS = 'Order';

export const CREATE_ORDER_OPERATION = {
  summary: 'Create a new order',
};

export const CREATE_ORDER_CONSUMES = 'application/json';

export const CREATE_ORDER_BODY = {
  type: CreateOrderRequest,
};

export const CREATE_ORDER_RESPONSE_SUCCESS = {
  status: HttpStatus.CREATED,
  description: 'The order has been successfully created.',
  type: CreateOrderResponse,
};
