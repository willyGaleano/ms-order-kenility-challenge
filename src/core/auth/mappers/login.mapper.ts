import { LoggedUser, LoginResponse } from '../models/dtos/login.dto';

export class LoginControllerMapper {
  static toLoginResponse(user: LoggedUser): LoginResponse {
    return {
      data: {
        user,
      },
    };
  }
}
