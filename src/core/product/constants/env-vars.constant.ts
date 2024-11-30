import { z } from 'zod';

export const ProductEnvVars = z
  .object({
    IMAGE_FILE_MAX_SIZE: z.coerce.number(),
    ALLOWED_IMAGE_MIMETYPES: z.string(),
  })
  .describe('ProductEnvVars');
