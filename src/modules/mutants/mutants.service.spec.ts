import { Test, TestingModule } from '@nestjs/testing';
import { MutantsService } from './mutants.service';

describe('MutantsService', () => {
  let service: MutantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutantsService],
    }).compile();

    service = module.get<MutantsService>(MutantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
