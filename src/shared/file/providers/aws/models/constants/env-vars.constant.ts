import { z } from 'zod';

export const AWSEnvVars = z
  .object({
    AWS_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
  })
  .describe('AWSEnvVars');
