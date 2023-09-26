import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MutantsController } from './mutants.controller';
import { MutantsService } from './mutants.service';
import { StatsService } from '@modules/stats/stats.service';
import { StatsOfMutantsEntity } from '@entities/stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatsOfMutantsEntity])],
  controllers: [MutantsController],
  providers: [MutantsService, StatsService],
})
export class MutantsModule {}
