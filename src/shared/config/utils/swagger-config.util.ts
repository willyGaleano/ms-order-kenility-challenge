import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MS Order Kenility Challenge')
  .setDescription('The MS Order Kenility Challenge API description')
  .setVersion('1.0.0')
  .addBearerAuth()
  .addTag('ms-order-kenility-challenge')
  .build();
