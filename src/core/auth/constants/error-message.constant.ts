import { AuthErrorType } from '../models/enums/auth-error-code.enum';

export const AuthMessageError: Record<AuthErrorType, string> = {
  [AuthErrorType.USER_NOT_FOUND]: 'User not found',
  [AuthErrorType.INVALID_CREDENTIALS]: 'Invalid credentials',
};
