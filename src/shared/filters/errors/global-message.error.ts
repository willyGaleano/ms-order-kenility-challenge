import { ProductErrorType } from '../../../core/product/models/enums/error-code.enum';
import { AuthErrorType } from '../../../core/auth/models/enums/auth-error-code.enum';
import { ProductMessageError } from '../../../core/product/constants/error-message.constant';
import { AuthMessageError } from '../../../core/auth/constants/error-message.constant';

export type ControlledErrorType = ProductErrorType | AuthErrorType;

export const ControlledMessageError: Record<ControlledErrorType, string> = {
  ...ProductMessageError,
  ...AuthMessageError,
};

export function isControlledErrorType(
  type: string,
): type is ControlledErrorType {
  return (
    Object.values(ProductErrorType).includes(type as ProductErrorType) ||
    Object.values(AuthErrorType).includes(type as AuthErrorType)
  );
}
