import { Test, TestingModule } from '@nestjs/testing';
import { TurnListController } from './turn-list.controller';

describe('TurnListController', () => {
  let controller: TurnListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnListController],
    }).compile();

    controller = module.get<TurnListController>(TurnListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
