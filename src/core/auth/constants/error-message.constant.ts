import { AuthErrorCode } from '../models/enums/auth-error-code.enum';

export const AuthMessageError: Record<AuthErrorCode, string> = {
  [AuthErrorCode.USER_NOT_FOUND]: 'User not found',
  [AuthErrorCode.INVALID_CREDENTIALS]: 'Invalid credentials',
};
