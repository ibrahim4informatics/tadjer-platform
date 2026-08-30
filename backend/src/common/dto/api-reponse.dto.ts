import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean = true;

  @ApiProperty({ description: 'A message describing the result' })
  message!: string;

  @ApiProperty({ description: 'The data returned by the API' })
  data!: T;
}
