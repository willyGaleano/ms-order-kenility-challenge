import { z } from 'zod';
import { EnvironmentVariables } from '../../constants/env-vars.constant';

export type EnvironmentVariablesType = z.infer<typeof EnvironmentVariables>;
