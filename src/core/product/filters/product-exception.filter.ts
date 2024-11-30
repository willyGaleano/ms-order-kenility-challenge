import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ProductErrorCode } from '../models/enums/error-code.enum';
import { ProductMessageError } from './errors/product-message.error';
import { ErrorResponse } from '../../../shared/models/types/error-response.type';
import { ControllerResponse } from '../../../shared/models/wrappers/response.wrapper';

@Catch()
export class ProductExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProductExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse: ErrorResponse | null = null;

    const userErrorCode = Object.values(ProductErrorCode).find(
      (errorCode) => errorCode === exception.message,
    );

    if (userErrorCode)
      errorResponse = {
        code: userErrorCode,
        message: ProductMessageError[userErrorCode],
      };

    if (!errorResponse) throw exception;

    this.logger.error({
      msg: 'User Exception Filter',
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
