import { Module } from '@nestjs/common';
import { ConfigAppModule } from './shared/config/config.module';
import { LoggerAppModule } from './shared/logger/logger.module';
import { DBModule } from './shared/db/db.module';
import { HealthCheckModule } from './shared/health/health.module';
import { ProductModule } from './core/product/product.module';
import { OrderModule } from './core/order/order.module';
import { FileModule } from './shared/file/file.module';
import { AuthModule } from './core/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';

@Module({
  imports: [
    ConfigAppModule,
    LoggerAppModule,
    DBModule,
    AuthModule,
    FileModule,
    HealthCheckModule,
    ProductModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
