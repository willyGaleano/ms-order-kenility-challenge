import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '../../config/models/types/global-config.type';
import { Environment } from '../../config/models/enums/app.enum';
import { LOGGER_TARGET } from '../../config/constants/app.constant';

export const getPinoLoggerConfig = (
  configService: ConfigService<GlobalConfig>,
) => {
  const appName = configService.get<string>('appName');
  const currentEnvironment = configService.get<Environment>('environment');
  const logLevel = configService.get<string>('logLevel');
  const loggerMessageKey = configService.get<string>('loggerMessageKey');

  return {
    pinoHttp: {
      name: appName,
      level: logLevel,
      messageKey: loggerMessageKey,
      autoLogging: false,
      serializers: {
        req: () => undefined,
        res: () => undefined,
      },
      transport:
        currentEnvironment === Environment.LOCAL
          ? {
              target: LOGGER_TARGET,
              options: { colorize: true, loggerMessageKey },
            }
          : undefined,
    },
  };
};
