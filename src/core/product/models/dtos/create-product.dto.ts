import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsPositive, IsString, MaxLength, MinLength } from 'class-validator';
import { ControllerResponse } from 'src/shared/models/wrappers/response.wrapper';

export class CreateProductRequest {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product Name',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'The SKU of the product',
    example: 'SKU123',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  sku: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 100.0,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsPositive()
  price: number;
}

export class CreateProductDto {
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
}

export class ProductCreated {
  productId: string;
}

export class CreateProductResponse extends ControllerResponse<ProductCreated> {}
