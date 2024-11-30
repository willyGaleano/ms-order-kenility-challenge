import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create.command';
import {
  CreateProductDto,
  ProductCreated,
} from '../../../models/dtos/create-product.dto';
import { ProductErrorCode } from '../../../models/enums/error-code.enum';
import { ProductCommandRepository } from '../../../repositories/product-command.repository';
import { UploadFileService } from '../../../../../shared/file/services/upload-file.service';
import { ProductQueryRepository } from '../../../repositories/product-query.repository';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly productRepository: ProductCommandRepository,
    private readonly productQueryRepository: ProductQueryRepository,
    private readonly uploadService: UploadFileService,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductCreated> {
    const { name, price, sku } = command;

    const exists = await this.productQueryRepository.exists({ name });
    if (exists)
      throw new ConflictException(ProductErrorCode.PRODUCT_ALREADY_EXISTS);

    const { url } = await this.uploadService.upload(command.file, 'products');

    const product: CreateProductDto = {
      name,
      price,
      sku,
      imageUrl: url,
    };

    const productId = await this.productRepository.create(product);

    return { productId };
  }
}
