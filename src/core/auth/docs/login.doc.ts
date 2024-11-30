import { LoginRequest, LoginResponse } from '../models/dtos/login.dto';

export const LOGIN_OPERATION = {
  summary: 'Login',
};

export const LOGIN_CONSUMES = 'application/json';

export const LOGIN_BODY = {
  type: LoginRequest,
};

export const LOGIN_RESPONSE_SUCCESS = {
  status: 200,
  description: 'The user has been successfully logged in.',
  type: LoginResponse,
};

export const LOGIN_RESPONSE_UNAUTHORIZED = {
  status: 401,
  description: 'The email or password is incorrect.',
};
