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
  GlobalMessageError,
  isGlobalErrorCode,
} from './errors/global-message.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const exceptionBody = exception.getResponse();
    this.logger.debug({
      msg: 'Handling exception',
      data: {
        exceptionBody,
      },
    });

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const userErrorCode = isGlobalErrorCode(exception.message)
      ? exception.message
      : null;

    const errorResponse: ErrorResponse = userErrorCode
      ? {
          code: userErrorCode,
          message: GlobalMessageError[userErrorCode],
        }
      : {
          code: 'CODE_NOT_CONFIGURED',
          message: exception.message,
        };

    this.logger.error({
      msg: errorResponse.message,
      data: {
        status,
        bodyRequest: ctx.getRequest().body,
      },
      cause: {
        ...errorResponse,
      },
    });

    httpAdapter.reply(
      ctx.getResponse(),
      new ControllerResponse(null, errorResponse),
      status,
    );
  }
}
