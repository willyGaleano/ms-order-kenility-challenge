import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginRequest, LoginResponse } from '../models/dtos/login.dto';
import { LoginCommand } from '../features/commands/login/login.command';
import { MapResponseInterceptor } from '../../../shared/interceptors/map-response.interceptor';
import { LoginControllerMapper } from '../mappers/login.mapper';
import {
  LOGIN_BODY,
  LOGIN_CONSUMES,
  LOGIN_OPERATION,
  LOGIN_RESPONSE_SUCCESS,
  LOGIN_RESPONSE_UNAUTHORIZED,
} from '../docs/login.doc';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @ApiOperation(LOGIN_OPERATION)
  @ApiConsumes(LOGIN_CONSUMES)
  @ApiBody(LOGIN_BODY)
  @ApiResponse(LOGIN_RESPONSE_SUCCESS)
  @ApiResponse(LOGIN_RESPONSE_UNAUTHORIZED)
  @UseInterceptors(
    new MapResponseInterceptor(LoginControllerMapper.toLoginResponse),
  )
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const { email, password } = body;
    return await this.commandBus.execute(new LoginCommand(email, password));
  }
}
