import { Module } from '@nestjs/common';
import { MutantsController } from './mutants.controller';
import { MutantsService } from './mutants.service';

@Module({
  controllers: [MutantsController],
  providers: [MutantsService],
})
export class MutantsModule {}
