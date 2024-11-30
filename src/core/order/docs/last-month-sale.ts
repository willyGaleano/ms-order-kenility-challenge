import { OrderTotalSoldLastMonthResponse } from '../models/dtos/aggregate-order.dto';

export const LAST_MONTH_SALE_OPERATION = {
  summary: 'Get the last month sale',
};

export const LAST_MONTH_SALE_RESPONSE_SUCCESS = {
  status: 200,
  description: 'The last month sale has been successfully retrieved.',
  type: OrderTotalSoldLastMonthResponse,
};
