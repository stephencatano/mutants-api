import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { Repository } from 'typeorm';

import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { StatsResponseDTO } from './interfaces/i-stats';
import { StatsOfMutantsEntity } from '@entities/stats.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('StatsController', () => {
  let controller: StatsController;
  let statsService: StatsService;
  let dnaRepository: Repository<StatsOfMutantsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        StatsService,
        {
          provide: getRepositoryToken(StatsOfMutantsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    statsService = module.get<StatsService>(StatsService);
    dnaRepository = module.get<Repository<StatsOfMutantsEntity>>(
      getRepositoryToken(StatsOfMutantsEntity),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get stats and return a response', async () => {
    const traceId = 'traceId';
    const stats: StatsResponseDTO = {
      count_mutant_dna: 10,
      count_human_dna: 20,
      ratio: 0.5,
    };

    jest.spyOn(statsService, 'getStatsOfMutants').mockResolvedValue(stats);

    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn().mockReturnThis();
    const responseMock: Partial<Response> = {
      status: statusMock,
      json: jsonMock,
    };

    const saveMock = jest.fn();
    dnaRepository.save = saveMock;

    const result = await controller.getStatsOfMutants(
      traceId,
      responseMock as Response,
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith(stats);
  });

  it('should handle error in getStatsOfMutants', async () => {
    const traceId = 'traceId';

    jest
      .spyOn(statsService, 'getStatsOfMutants')
      .mockRejectedValue(new Error('Error al obtener estadísticas'));

    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn().mockReturnThis();
    const responseMock: Partial<Response> = {
      status: statusMock,
      json: jsonMock,
    };

    const result = await controller.getStatsOfMutants(
      traceId,
      responseMock as Response,
    );

    expect(result.status).toHaveBeenCalledWith(500);
    expect(result.json).toHaveBeenCalledWith([
      {
        origin: 'MUTANTS_API_STATSCONTROLLER_GET_STATS_OF_MUTANTS',
        trace_id: traceId,
        message: 'Error al obtener estadísticas',
      },
    ]);
  });
});
