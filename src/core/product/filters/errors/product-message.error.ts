import { ProductErrorCode } from '../../models/enums/error-code.enum';

export const ProductMessageError: Record<ProductErrorCode, string> = {
  [ProductErrorCode.PRODUCT_ALREADY_EXISTS]: 'Product already exists.',
  [ProductErrorCode.PRODUCT_NOT_FOUND]: 'Product not found.',
};
