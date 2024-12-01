import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ControllerResponse } from '../models/wrappers/response.wrapper';
import { ErrorResponse } from '../models/types/error-response.type';
import {
  ControlledMessageError,
  isControlledErrorType,
} from './errors/global-message.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const bodyErrorResponse = exception.getResponse();
    const bodyRequest = ctx.getRequest().body;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const controlledErrorType = isControlledErrorType(exception.message)
      ? exception.message
      : null;

    const errorResponse: ErrorResponse = controlledErrorType
      ? {
          type: controlledErrorType,
          message: ControlledMessageError[controlledErrorType],
        }
      : {
          type: 'NOT_CONTROLLED_ERROR',
          message: exception.message,
          bodyResponse: bodyErrorResponse,
        };

    this.logger.error({
      msg: errorResponse.message,
      cause: {
        ...errorResponse,
      },
      data: {
        status,
        bodyRequest,
      },
    });

    httpAdapter.reply(
      ctx.getResponse(),
      new ControllerResponse(null, errorResponse),
      status,
    );
  }
}
