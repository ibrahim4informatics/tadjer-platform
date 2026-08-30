import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipResponseTransform } from './common/decorators/skip-response-transform.decorator';
import { ApiSuccessResponse } from './common/decorators/api-response.decorator';
import { ApiNotFoundResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @SkipResponseTransform()
  getHello() {
    return this.appService.getHello();
  }
}
