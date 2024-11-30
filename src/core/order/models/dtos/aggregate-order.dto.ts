import { ControllerResponse } from '../../../../shared/models/wrappers/response.wrapper';

export class OrderAggregateLastMonthSaleDBResponse {
  totalSold: number;
}

export class OrderTotalSoldLastMonth {
  totalSoldLastMonth: number;
}

export class OrderTotalSoldLastMonthResponse extends ControllerResponse<OrderTotalSoldLastMonth> {}
