import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ControllerResponse } from '../../../../shared/models/wrappers/response.wrapper';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    minLength: 8,
    maxLength: 100,
    example: 'admin@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(8)
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    minLength: 6,
    maxLength: 50,
    example: 'adminpassword123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}

export class LoggedUser {
  id: string;
  accessToken: string;
}

export class LoginDetail {
  user: LoggedUser;
}

export class LoginResponse extends ControllerResponse<LoginDetail> {}
