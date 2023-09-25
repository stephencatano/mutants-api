import { Test, TestingModule } from '@nestjs/testing';
import { MutantsController } from './mutants.controller';

describe('MutantsController', () => {
  let controller: MutantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutantsController],
    }).compile();

    controller = module.get<MutantsController>(MutantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
