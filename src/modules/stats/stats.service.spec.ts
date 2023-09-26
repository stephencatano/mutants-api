import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { StatsOfMutantsEntity } from '@entities/stats.entity';
import { StatsForCreateDTO } from './interfaces/i-stats';

describe('StatsService', () => {
  let service: StatsService;
  let statsRepository: Repository<StatsOfMutantsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        {
          provide: getRepositoryToken(StatsOfMutantsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);
    statsRepository = module.get<Repository<StatsOfMutantsEntity>>(
      getRepositoryToken(StatsOfMutantsEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all stats', async () => {
    const stats: any[] = [
      {
        id: 1,
        dna_code: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
        is_mutant: false,
        created_at: '2023-09-26T07:12:08.821Z',
        updated_at: '2023-09-26T07:12:08.821Z',
      },
    ];

    jest.spyOn(statsRepository, 'find').mockResolvedValue(stats);

    const result = await service.findAll();

    expect(result).toStrictEqual(stats);
  });

  it('should save stats', async () => {
    const data: StatsForCreateDTO = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
      isMutant: false,
    };

    const savedStat: any = {
      id: 1,
      dna_code: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
      is_mutant: false,
      created_at: '2023-09-26T07:12:08.821Z',
      updated_at: '2023-09-26T07:12:08.821Z',
    };

    jest.spyOn(statsRepository, 'save').mockResolvedValue(savedStat);

    const result = await service.save(data);

    expect(result).toBe(savedStat);
  });

  it('should calculate stats', async () => {
    const stats: any[] = [
      {
        id: 1,
        dna_code: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
        is_mutant: false,
        created_at: '2023-09-26T07:12:08.821Z',
        updated_at: '2023-09-26T07:12:08.821Z',
      },
      {
        id: 2,
        dna_code: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
        is_mutant: true,
        created_at: '2023-09-26T07:12:08.821Z',
        updated_at: '2023-09-26T07:12:08.821Z',
      },
      {
        id: 3,
        dna_code: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
        is_mutant: false,
        created_at: '2023-09-26T07:12:08.821Z',
        updated_at: '2023-09-26T07:12:08.821Z',
      },
    ];
    const expectedMock = {
      count_mutant_dna: 1,
      count_human_dna: 2,
      ratio: 0.3,
    };

    jest.spyOn(statsRepository, 'find').mockResolvedValue(stats);

    const result = await service.getStatsOfMutants();

    expect(result).toStrictEqual(expectedMock);
  });
});
