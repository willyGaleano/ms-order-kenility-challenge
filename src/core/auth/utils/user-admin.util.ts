import { USERS_ADMIN } from '../constants/user-admin.constant';
import { UserAdmin } from '../models/types/auth.type';

export function getUserAdminById(userId: string): UserAdmin | undefined {
  return USERS_ADMIN.find((user: UserAdmin) => user.id === userId);
}

export function getUserAdminByEmail(email: string): UserAdmin | undefined {
  return USERS_ADMIN.find((user: UserAdmin) => user.email === email);
}
