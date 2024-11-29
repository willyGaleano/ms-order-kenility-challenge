import { Type } from 'class-transformer';
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

export class ProductCreateOrder {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDecimal()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderCommand {
  constructor(customerName: string, products: ProductCreateOrder[]) {
    this.customerName = customerName;
    this.products = products;
  }

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  customerName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCreateOrder)
  @ArrayMinSize(1)
  products: ProductCreateOrder[];
}
