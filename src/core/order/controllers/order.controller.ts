import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderCommand } from '../features/commands/create/create.command';
import { UpdateOrderCommand } from '../features/commands/update/update.command';
import { GetLargestOrderQuery } from '../features/queries/largest/largest.query';
import { GetLastMonthSaleQuery } from '../features/queries/last-month-sale/lasth-month-sale.query';
import {
  CreateOrderRequest,
  CreateOrderResponse,
} from '../models/dtos/create-order.dto';
import { MapResponseInterceptor } from '../../../shared/interceptors/map-response.interceptor';
import { OrderControllerMapper } from '../mappers/order-controller.mapper';
import {
  CREATE_ORDER_BODY,
  CREATE_ORDER_CONSUMES,
  CREATE_ORDER_OPERATION,
  CREATE_ORDER_RESPONSE_SUCCESS,
} from '../docs/create.doc';
import {
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '../models/dtos/update-order.dto';
import { ParseMongoIdPipe } from '../../../shared/pipes/mongo-id.pipe';
import {
  UPDATE_ORDER_BODY,
  UPDATE_ORDER_CONSUMES,
  UPDATE_ORDER_OPERATION,
  UPDATE_ORDER_PARAM_ID,
  UPDATE_ORDER_RESPONSE_SUCCESS,
} from '../docs/update.docs';
import { OrderDetailResponse } from '../models/dtos/detail-order.dto';
import {
  LARGEST_OPERATION,
  LARGEST_RESPONSE_SUCCESS,
} from '../docs/largest.doc';
import { OrderTotalSoldLastMonthResponse } from '../models/dtos/aggregate-order.dto';
import {
  LAST_MONTH_SALE_OPERATION,
  LAST_MONTH_SALE_RESPONSE_SUCCESS,
} from '../docs/last-month-sale';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation(CREATE_ORDER_OPERATION)
  @ApiConsumes(CREATE_ORDER_CONSUMES)
  @ApiBody(CREATE_ORDER_BODY)
  @ApiResponse(CREATE_ORDER_RESPONSE_SUCCESS)
  @UseInterceptors(
    new MapResponseInterceptor(OrderControllerMapper.toCreateResponse),
  )
  async create(@Body() body: CreateOrderRequest): Promise<CreateOrderResponse> {
    const { customerName, products } = body;
    return await this.commandBus.execute(
      new CreateOrderCommand(customerName, products),
    );
  }

  @Put(':id')
  @ApiOperation(UPDATE_ORDER_OPERATION)
  @ApiConsumes(UPDATE_ORDER_CONSUMES)
  @ApiParam(UPDATE_ORDER_PARAM_ID)
  @ApiBody(UPDATE_ORDER_BODY)
  @ApiResponse(UPDATE_ORDER_RESPONSE_SUCCESS)
  @UseInterceptors(
    new MapResponseInterceptor(OrderControllerMapper.toUpdateResponse),
  )
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateOrderRequest,
  ): Promise<UpdateOrderResponse> {
    const { status } = body;
    return await this.commandBus.execute(new UpdateOrderCommand(id, status));
  }

  @Get('largest')
  @ApiOperation(LARGEST_OPERATION)
  @ApiResponse(LARGEST_RESPONSE_SUCCESS)
  @UseInterceptors(
    new MapResponseInterceptor(OrderControllerMapper.toLargestResponse),
  )
  async largest(): Promise<OrderDetailResponse> {
    return await this.queryBus.execute(new GetLargestOrderQuery());
  }

  @Get('last-month-sales')
  @ApiOperation(LAST_MONTH_SALE_OPERATION)
  @ApiResponse(LAST_MONTH_SALE_RESPONSE_SUCCESS)
  @UseInterceptors(
    new MapResponseInterceptor(OrderControllerMapper.toLastMonthSalesResponse),
  )
  async lastMonthSales(): Promise<OrderTotalSoldLastMonthResponse> {
    return await this.queryBus.execute(new GetLastMonthSaleQuery());
  }
}
