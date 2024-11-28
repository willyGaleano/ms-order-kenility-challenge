import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validateEnvVariables } from './shared/config/utils/validate-env-vars.util';
import {
  GLOBAL_API_VERSION,
  HTTP_PORT_DEFAULT,
} from './shared/config/constants/app.constant';
import { swaggerConfig } from './shared/config/utils/swagger-config.util';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const configService = app.get<ConfigService>(ConfigService);
  validateEnvVariables(process.env, app.get(Logger));

  const APP_NAME = configService.get<string>('APP_NAME');
  const GLOBAL_API_PREFIX = `${APP_NAME}/${GLOBAL_API_VERSION}`;

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.useLogger(app.get(Logger));
  //app.useGlobalPipes(new ValidationPipe({}));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${GLOBAL_API_PREFIX}/api-docs`, app, document);

  await app.listen(
    configService.get<number>('HTTP_PORT', HTTP_PORT_DEFAULT),
    '0.0.0.0',
    async () => {
      app
        .get(Logger)
        .log(`Server ${APP_NAME} is running on: ${await app.getUrl()}`);
    },
  );
}

bootstrap();
