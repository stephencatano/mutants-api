import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggerService } from '@shared/logger/logger.service';
import {
  calcStatsOfMutants,
  mapStatsToEntity,
} from '@shared/utils/mutants.util';
import { StatsOfMutantsEntity } from '@entities/stats.entity';
import {
  StatsForCreateDTO,
  StatsMappedForCreateDTO,
  StatsResponseDTO,
} from './interfaces/i-stats';

@Injectable()
export class StatsService extends LoggerService {
  constructor(
    @InjectRepository(StatsOfMutantsEntity)
    private readonly statsOfMutantsRepository: Repository<StatsOfMutantsEntity>,
  ) {
    super(StatsService.name);
  }

  async findAll(): Promise<StatsOfMutantsEntity[]> {
    return this.statsOfMutantsRepository.find();
  }

  async save(data: StatsForCreateDTO): Promise<StatsOfMutantsEntity> {
    const statToEntity: StatsMappedForCreateDTO = mapStatsToEntity(data);

    return this.statsOfMutantsRepository.save(statToEntity);
  }

  async getStatsOfMutants(): Promise<StatsResponseDTO> {
    const stats = await this.findAll();

    return calcStatsOfMutants(stats);
  }
}
