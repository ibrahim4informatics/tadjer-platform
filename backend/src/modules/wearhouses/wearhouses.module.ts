import { Module } from '@nestjs/common';
import { WearhousesService } from './wearhouses.service';
import { WearhousesController } from './wearhouses.controller';

@Module({
  controllers: [WearhousesController],
  providers: [WearhousesService],
})
export class WearhousesModule {}
