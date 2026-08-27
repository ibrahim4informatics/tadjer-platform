import { Controller } from '@nestjs/common';
import { WearhousesService } from './wearhouses.service';

@Controller('wearhouses')
export class WearhousesController {
  constructor(private readonly wearhousesService: WearhousesService) {}
}
