import {
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          throw new ConflictException('Duplicate record.');
        case 'P2025':
          throw new NotFoundException('Record not found.');
        case 'P2003':
          throw new BadRequestException('Foreign key constraint failed.');
        default:
          throw new BadRequestException(exception.message);
      }
    }

    if (exception instanceof PrismaClientValidationError) {
      throw new BadRequestException('Invalid database payload.');
    }

    if (exception instanceof PrismaClientInitializationError) {
      throw new ServiceUnavailableException('Database connection failed.');
    }

    if (exception instanceof PrismaClientUnknownRequestError) {
      throw new InternalServerErrorException('Unknown database error.');
    }

    throw new InternalServerErrorException('Unexpected error.');
  }
}
