import { Test, TestingModule } from '@nestjs/testing';
import { MutantsController } from './mutants.controller';
import { MutantsService } from './mutants.service';
import { DnaCodeDTO } from './mutants.dto';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { StatsOfMutantsEntity } from '@entities/stats.entity';
import { StatsService } from '@modules/stats/stats.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MutantsController', () => {
  let controller: MutantsController;
  let mutantsService: MutantsService;
  let dnaRepository: Repository<StatsOfMutantsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutantsController],
      providers: [
        MutantsService,
        StatsService,
        {
          provide: getRepositoryToken(StatsOfMutantsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MutantsController>(MutantsController);
    mutantsService = module.get<MutantsService>(MutantsService);
    dnaRepository = module.get<Repository<StatsOfMutantsEntity>>(
      getRepositoryToken(StatsOfMutantsEntity),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should validate DNA code and return isMutant: true', async () => {
    const traceId = 'traceId';
    const dnaCode: DnaCodeDTO = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
    };
    const isMutant = true;

    jest.spyOn(mutantsService, 'validateDnaCode').mockResolvedValue(isMutant);
    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn().mockReturnThis();
    const responseMock: Partial<Response> = {
      status: statusMock,
      json: jsonMock,
    };
    const saveMock = jest.fn();
    dnaRepository.save = saveMock;

    const result = await controller.validateDnaCode(
      traceId,
      dnaCode,
      responseMock as Response,
    );

    expect(result.status).toHaveBeenCalledWith(isMutant ? 200 : 403);
    expect(result.json).toHaveBeenCalledWith({ isMutant });
  });

  it('should validate DNA code and return isMutant: false', async () => {
    const traceId = 'traceId';
    const dnaCode: DnaCodeDTO = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTA'],
    };
    const isMutant = false;

    jest.spyOn(mutantsService, 'validateDnaCode').mockResolvedValue(isMutant);
    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn().mockReturnThis();
    const responseMock: Partial<Response> = {
      status: statusMock,
      json: jsonMock,
    };
    const saveMock = jest.fn();
    dnaRepository.save = saveMock;

    const result = await controller.validateDnaCode(
      traceId,
      dnaCode,
      responseMock as Response,
    );

    expect(result.status).toHaveBeenCalledWith(isMutant ? 200 : 403);
    expect(result.json).toHaveBeenCalledWith({ isMutant });
  });

  it('should validate DNA code and is broken', async () => {
    const traceId = 'traceId';
    const dnaCode: DnaCodeDTO = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTA'],
    };

    jest
      .spyOn(mutantsService, 'validateDnaCode')
      .mockRejectedValue(new Error('Error al validar el código DNA'));
    const statusMock = jest.fn().mockReturnThis();
    const jsonMock = jest.fn().mockReturnThis();
    const responseMock: Partial<Response> = {
      status: statusMock,
      json: jsonMock,
    };
    const saveMock = jest.fn();
    dnaRepository.save = saveMock;

    const result = await controller.validateDnaCode(
      traceId,
      dnaCode,
      responseMock as Response,
    );

    expect(result.status).toHaveBeenCalledWith(500);
    expect(result.json).toHaveBeenCalledWith([
      {
        origin: 'MUTANTS_API_MUTANTSCONTROLLER_VALIDATE_DNA_CODE',
        trace_id: traceId,
        message: 'Error al validar el código DNA',
      },
    ]);
  });
});
