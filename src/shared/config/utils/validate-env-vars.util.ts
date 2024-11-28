import { Logger } from 'nestjs-pino';
import { ZodError } from 'zod';
import { EnvironmentVariables } from '../constants/env-vars.constant';

export const validateEnvVariables = (
  config: Record<string, unknown>,
  logger: Logger,
) => {
  try {
    return EnvironmentVariables.parse(config);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const pathErrors = error.errors.map((err) => err.path.join('.'));
      logger.warn({
        msg: 'Invalid environment variables',
        errors: `Environment variables don't match the schema:
          ${pathErrors.join(', ')}`,
      });
    } else {
      logger.error({
        msg: 'Exception while validating environment variables',
        error,
      });
    }

    return true;
  }
};
