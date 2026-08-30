// To make exceptions consistent with the response format,
// we can create a custom exception filter that transforms the exceptions into a standardized response format. T
// his filter will catch all exceptions thrown by the application and format them according to the ApiResponseError interface.

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ApiResponseError } from '../types/api-response-error.type';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Default values for the error response
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const errorResponse = exceptionResponse as Record<string, unknown>;

        if (typeof errorResponse.message === 'string') {
          message = errorResponse.message;
        }

        else if (Array.isArray(errorResponse.message)) {
          details = errorResponse.message;
          message = 'Validation failed';
        }

        else if (errorResponse.error) {
          details = errorResponse.error;
        }
      }
    }

    const errorResponse: ApiResponseError = {
      success: false,
      message,
      error: {
        code: this.getErrorCode(statusCode),
        statusCode,
        ...(details !== undefined ? { details } : {}),
      },
    };
    response.status(statusCode).json(errorResponse);
  }

  private getErrorCode(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'BAD_REQUEST';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      case 422:
        return 'UNPROCESSABLE_ENTITY';
      case 429:
        return 'TOO_MANY_REQUESTS';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'UNKNOWN_ERROR';
    }
  }
}
