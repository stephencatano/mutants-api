import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MutantsService } from './mutants.service';
import { StatsService } from '@modules/stats/stats.service';
import { StatsOfMutantsEntity } from '../../database/models/stats.entity';
import { DnaCodeDTO } from './mutants.dto';

describe('MutantsService', () => {
  let service: MutantsService;
  let statsService: StatsService;
  let dnaRepository: Repository<StatsOfMutantsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutantsService,
        StatsService,
        {
          provide: getRepositoryToken(StatsOfMutantsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MutantsService>(MutantsService);
    statsService = module.get<StatsService>(StatsService);
    dnaRepository = module.get<Repository<StatsOfMutantsEntity>>(
      getRepositoryToken(StatsOfMutantsEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(statsService).toBeDefined();
    expect(dnaRepository).toBeDefined();
  });

  it('should validate DNA code and save stats', async () => {
    const dnaCode: DnaCodeDTO = {
      dna: ['AAAAAA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
    };

    const saveMock = jest.fn();
    dnaRepository.save = saveMock;

    const result = await service.validateDnaCode(dnaCode);

    expect(result).toBe(true);

    expect(saveMock).toHaveBeenCalledWith({
      dna_code: dnaCode.dna,
      is_mutant: true,
    });
  });
});
