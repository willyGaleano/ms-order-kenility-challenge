import { ProductErrorCode } from '../../../core/product/models/enums/error-code.enum';
import { AuthErrorCode } from '../../../core/auth/models/enums/auth-error-code.enum';
import { ProductMessageError } from '../../../core/product/constants/error-message.constant';
import { AuthMessageError } from '../../../core/auth/constants/error-message.constant';

export type GlobalErrorCode = ProductErrorCode | AuthErrorCode;

export const GlobalMessageError: Record<GlobalErrorCode, string> = {
  ...ProductMessageError,
  ...AuthMessageError,
};

export function isGlobalErrorCode(code: string): code is GlobalErrorCode {
  return (
    Object.values(ProductErrorCode).includes(code as ProductErrorCode) ||
    Object.values(AuthErrorCode).includes(code as AuthErrorCode)
  );
}
