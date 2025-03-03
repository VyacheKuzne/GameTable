import { Test, TestingModule } from '@nestjs/testing';
import { TurnListService } from './turn-list.service';

describe('TurnListService', () => {
  let service: TurnListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnListService],
    }).compile();

    service = module.get<TurnListService>(TurnListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
