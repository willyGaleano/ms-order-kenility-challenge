import { z } from 'zod';
import {
  environmentValues,
  logLevelValues,
  nodeEnvValues,
} from './app.constant';
import { MongoDBEnvVars } from '../../db/clients/mongo/models/constants/env-vars.constant';

export const CommonEnvVars = z
  .object({
    APP_NAME: z.string(),
    HTTP_PORT: z.coerce.number(),
    NODE_ENV: z.enum(nodeEnvValues),
    LOG_LEVEL: z.enum(logLevelValues),
    ENVIRONMENT: z.enum(environmentValues),
    LOGGER_MESSAGE_KEY: z.string().optional(),
  })
  .describe('CommonEnvVars');

export const EnvironmentVariables = CommonEnvVars.merge(
  MongoDBEnvVars,
).describe('EnvironmentVariables');
