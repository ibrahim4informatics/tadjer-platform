import { applyDecorators, Type } from '@nestjs/common';

import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ApiResponseDto } from '../dto/api-reponse.dto';



/**
 * Usage
 * @APiSuccessResponse(DTO, DESCRIPTION)
 */
export const ApiSuccessResponse = <ModelType extends Type<unknown>>(
  model: ModelType,
  message: string = 'Request successful',
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto, model),
    ApiOkResponse({
      description: message,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
