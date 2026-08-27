import { Test, TestingModule } from '@nestjs/testing';
import { WearhousesController } from './wearhouses.controller';
import { WearhousesService } from './wearhouses.service';

describe('WearhousesController', () => {
  let controller: WearhousesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WearhousesController],
      providers: [WearhousesService],
    }).compile();

    controller = module.get<WearhousesController>(WearhousesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
