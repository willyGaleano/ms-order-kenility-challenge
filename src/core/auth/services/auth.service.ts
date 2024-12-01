import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthErrorType } from '../models/enums/auth-error-code.enum';
import { AuthJwtPayload, UserRequest } from '../models/types/auth.type';
import { getUserAdminById } from '../utils/user-admin.util';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateJwtUser(userId: string): Promise<UserRequest> {
    const user = getUserAdminById(userId);

    if (!user) throw new UnauthorizedException(AuthErrorType.USER_NOT_FOUND);

    return { id: user.id };
  }

  async generateToken(userId: string, email: string): Promise<string> {
    const payload: AuthJwtPayload = { sub: userId, email };

    return await this.jwtService.signAsync(payload);
  }
}
