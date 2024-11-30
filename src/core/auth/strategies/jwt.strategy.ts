import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariablesType } from '../../../shared/config/models/types/env-vars.type';
import { AuthJwtPayload, UserRequest } from '../models/types/auth.type';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService<EnvironmentVariablesType>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: configService.get('JWT_IGNORE_EXPIRATION') === 'true',
    });
  }

  async validate(payload: AuthJwtPayload): Promise<UserRequest> {
    const { sub: userId } = payload;
    const user = await this.authService.validateJwtUser(userId);
    return user;
  }
}
