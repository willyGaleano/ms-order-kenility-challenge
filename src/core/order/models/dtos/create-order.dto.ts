import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ControllerResponse } from '../../../../shared/models/wrappers/response.wrapper';

export class ProductCreateOrder {
  @ApiProperty({
    description: 'The ID of the product',
    example: '60e4f1d5e6c8a3b6b4f8d4a4',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 100.0,
  })
  @IsDecimal()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderRequest {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'Customer Name',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  customerName: string;

  @ApiProperty({
    description: 'The products to be ordered',
    type: [ProductCreateOrder],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCreateOrder)
  @ArrayMinSize(1)
  products: ProductCreateOrder[];
}

export class CreateOrderDto {
  customerName: string;
  total: number;
  products: string[];
}

export class OrderCreated {
  @ApiProperty({
    description: 'The ID of the order',
    type: String,
    example: '60e4f1d5e6c8a3b6b4f8d4a4',
  })
  orderId: string;
}

export class CreateOrderResponse extends ControllerResponse<OrderCreated> {}
