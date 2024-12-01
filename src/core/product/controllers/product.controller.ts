import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileToUpload } from '../../../shared/file/models/types/upload.type';
import {
  CreateProductRequest,
  CreateProductResponse,
} from '../models/dtos/create-product.dto';
import { CreateProductCommand } from '../features/commands/create/create.command';
import { ProductDetailQuery } from '../features/queries/detail/detail.query';
import { multerImageOptions } from '../utils/image-file.util';
import {
  CREATE_PRODUCT_BODY,
  CREATE_PRODUCT_CONSUMES,
  CREATE_PRODUCT_OPERATION,
  CREATE_PRODUCT_RESPONSE_ERROR,
  CREATE_PRODUCT_RESPONSE_SUCCESS,
} from '../docs/create.doc';
import {
  DETAIL_OPERATION,
  DETAIL_PARAM,
  DETAIL_RESPONSE_NOT_FOUND,
  DETAIL_RESPONSE_SUCCESS,
} from '../docs/detail.doc';
import { MapResponseInterceptor } from '../../../shared/interceptors/map-response.interceptor';
import { ProductControllerMapper } from '../mappers/product-controller.mapper';
import { ProductDetailResponse } from '../models/dtos/detail-product.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation(CREATE_PRODUCT_OPERATION)
  @ApiConsumes(CREATE_PRODUCT_CONSUMES)
  @ApiBody(CREATE_PRODUCT_BODY)
  @ApiResponse(CREATE_PRODUCT_RESPONSE_SUCCESS)
  @ApiResponse(CREATE_PRODUCT_RESPONSE_ERROR)
  @UseInterceptors(FileInterceptor('image', multerImageOptions))
  @UseInterceptors(
    new MapResponseInterceptor(ProductControllerMapper.toCreateResponse),
  )
  async create(
    @UploadedFile() image: FileToUpload,
    @Body() body: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const { name, price, sku } = body;

    return await this.commandBus.execute(
      new CreateProductCommand(name, sku, price, image),
    );
  }

  @Get(':id')
  @ApiOperation(DETAIL_OPERATION)
  @ApiParam(DETAIL_PARAM)
  @ApiResponse(DETAIL_RESPONSE_SUCCESS)
  @ApiResponse(DETAIL_RESPONSE_NOT_FOUND)
  @UseInterceptors(
    new MapResponseInterceptor(ProductControllerMapper.toDetailResponse),
  )
  async detail(@Param('id') id: string): Promise<ProductDetailResponse> {
    return await this.queryBus.execute(new ProductDetailQuery(id));
  }
}
