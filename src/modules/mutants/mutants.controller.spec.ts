import { Test, TestingModule } from '@nestjs/testing';

import { MutantsController } from './mutants.controller';
import { MutantsService } from './mutants.service';

describe('MutantsController', () => {
  let controller: MutantsController;
  let service: MutantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutantsController],
      providers: [MutantsService],
    }).compile();

    controller = module.get<MutantsController>(MutantsController);
    service = module.get<MutantsService>(MutantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be isMutant: true', async () => {
    const traceId = 'traceId';
    const dnaCode = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
    };

    const expectedResult = { isMutant: true };
    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    jest.spyOn(service, 'validateDnaCode').mockReturnValue(expectedResult);

    const result = await controller.validateDnaCode(
      traceId,
      dnaCode,
      responseMock,
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith(expectedResult);
  });

  it('should be isMutant: false', async () => {
    const traceId = 'traceId';
    const dnaCode = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
    };

    const expectedResult = { isMutant: false };
    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    jest.spyOn(service, 'validateDnaCode').mockReturnValue(expectedResult);

    const result = await controller.validateDnaCode(
      traceId,
      dnaCode,
      responseMock,
    );

    expect(result.status).toHaveBeenCalledWith(403);
    expect(result.json).toHaveBeenCalledWith(expectedResult);
  });

  it('should be broken', async () => {
    const traceId = 'traceId';
    const dnaCode = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
    };

    const expectedResult = [
      {
        message: 'response.status is not a function',
        origin: 'MUTANTS_API_MUTANTSCONTROLLER_VALIDATE_DNA_CODE',
        trace_id: 'traceId',
      },
    ];
    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    jest.spyOn(service, 'validateDnaCode').mockImplementation(() => {
      throw new Error(expectedResult[0].message);
    });

    const result = await controller.validateDnaCode(
      traceId,
      dnaCode,
      responseMock,
    );

    expect(result.status).toHaveBeenCalledWith(500);
    expect(result.json).toHaveBeenCalledWith(expectedResult);
  });
});
