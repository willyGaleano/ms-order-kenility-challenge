import { Module } from '@nestjs/common';
import { ConfigAppModule } from './shared/config/config.module';
import { LoggerAppModule } from './shared/logger/logger.module';
import { DBModule } from './shared/db/db.module';
import { HealthCheckModule } from './shared/health/health.module';
import { UserModule } from './core/user/user.module';
import { ProductModule } from './core/product/product.module';
import { OrderModule } from './core/order/order.module';
import { FileModule } from './shared/file/file.module';

@Module({
  imports: [
    ConfigAppModule,
    LoggerAppModule,
    DBModule,
    FileModule,
    HealthCheckModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
