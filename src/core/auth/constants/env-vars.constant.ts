import { z } from 'zod';

export const AuthEnvVars = z
  .object({
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    JWT_IGNORE_EXPIRATION: z.string(),
  })
  .describe('AuthEnvVars');
