import { z } from 'zod';

export const MongoDBEnvVars = z
  .object({
    MONGODB_PORT: z.coerce.number(),
    MONGO_INITDB_DATABASE: z.string(),
    MONGODB_URI: z.string(),
  })
  .describe('MongoDBEnvVars');
