import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MapResponseInterceptor<TSource, TDestination>
  implements NestInterceptor
{
  private readonly logger = new Logger(MapResponseInterceptor.name);
  constructor(
    private readonly transformFn: (source: TSource) => TDestination,
  ) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: TSource) => {
        this.logger.debug({
          msg: 'MapResponseInterceptor - Response Data',
          data,
        });
        return this.transformFn(data);
      }),
    );
  }
}
