import { ProductErrorType } from '../models/enums/error-code.enum';

export const ProductMessageError: Record<ProductErrorType, string> = {
  [ProductErrorType.PRODUCT_ALREADY_EXISTS]: 'Product already exists.',
  [ProductErrorType.PRODUCT_NOT_FOUND]: 'Product not found.',
};
