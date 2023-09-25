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

  describe('validateDnaCode', () => {
    it('should return isMutant: true for a mutant DNA', () => {
      const mutantDna = {
        dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
      };
      const result = service.validateDnaCode(mutantDna);
      expect(result).toEqual({ isMutant: true });
    });

    it('should return isMutant: false for a non-mutant DNA', () => {
      const nonMutantDna = {
        dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
      };
      const result = service.validateDnaCode(nonMutantDna);
      expect(result).toEqual({ isMutant: false });
    });
  });
});
