// Interceptor to transform the response of the API to a standard format

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Response types
import { ApiResponse } from '../types/api-response.type';
import { ApiResponseError } from '../types/api-response-error.type';

// To get data from decorators
import { Reflector } from '@nestjs/core';

// DECORATORS METADATA KEYS
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';
import { SKIP_RESPONSE_TRANSFORM_KEY } from '../decorators/skip-response-transform.decorator';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T> | T
> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<T | ApiResponse<T>> | Promise<Observable<T | ApiResponse<T>>> {
    const isSkipTransform = this.reflector.getAllAndOverride<boolean>(
      SKIP_RESPONSE_TRANSFORM_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log(isSkipTransform)

    if (isSkipTransform) {
      return next.handle();
    }

    const message =
      this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? 'Request successful';
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          message,
          data,
        };
      }),
    );
  }
}
