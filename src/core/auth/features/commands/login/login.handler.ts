import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { AuthService } from '../../../services/auth.service';
import { LoggedUser } from '../../../models/dtos/login.dto';
import { AuthErrorCode } from '../../../models/enums/auth-error-code.enum';
import { getUserAdminByEmail } from '../../../utils/user-admin.util';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LoginCommand): Promise<LoggedUser> {
    const { email, password } = command;

    const user = getUserAdminByEmail(email);

    if (!user || user.password !== password)
      throw new Error(AuthErrorCode.INVALID_CREDENTIALS);

    const userId = user.id;

    const accessToken = await this.authService.generateToken(userId, email);

    return { id: userId, accessToken };
  }
}
