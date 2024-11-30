import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/schemas/product.schema';
import { ProductQueryRepository } from './repositories/product-query.repository';
import { ProductCommandRepository } from './repositories/product-command.repository';
import { CreateProductHandler } from './features/commands/create/create.handler';
import { ProductDetailHandler } from './features/queries/detail/detail.handler';
import { ProductController } from './controllers/product.controller';
import { FileModule } from '../../shared/file/file.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CqrsModule,
    FileModule,
  ],
  providers: [
    ProductQueryRepository,
    ProductCommandRepository,
    CreateProductHandler,
    ProductDetailHandler,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
