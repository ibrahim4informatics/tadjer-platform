import { Test, TestingModule } from '@nestjs/testing';
import { WearhousesService } from './wearhouses.service';

describe('WearhousesService', () => {
  let service: WearhousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WearhousesService],
    }).compile();

    service = module.get<WearhousesService>(WearhousesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
