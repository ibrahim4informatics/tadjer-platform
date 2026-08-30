import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiErrorDto {
  @ApiProperty({
    description: 'A code representing the type of error',
    example: 'NOT_FOUND',
  })
  code!: string;

  @ApiProperty({
    description: 'The HTTP status code of the error',
    example: 404,
  })
  statusCode!: number;

  @ApiPropertyOptional({ description: 'The data returned by the API' })
  details?: unknown;
}

export class ApiResponseErrorDto {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: false,
  })
  status: boolean = false;

  @ApiProperty({
    description: 'A message describing the error',
    example: 'User not found',
  })
  message!: string;

  @ApiProperty({ description: 'The error details', type: ApiErrorDto })
  error!: ApiErrorDto;
}
