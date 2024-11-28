import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_API } from '../config/constants/app.constant';

export const Public = () => SetMetadata(IS_PUBLIC_API, true);
