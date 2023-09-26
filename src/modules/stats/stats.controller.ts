import { Controller, Get, Headers, Res } from '@nestjs/common';

import { LoggerService } from '@shared/logger/logger.service';
import { StatsService } from './stats.service';
import { SERVICE_ERROR } from '@config/errors.enum';
import { StatsResponseDTO } from './interfaces/i-stats';

@Controller('stats')
export class StatsController extends LoggerService {
  constructor(private readonly statsService: StatsService) {
    super(StatsController.name);
  }
  @Get('/')
  async getStatsOfMutants(
    @Headers('trace_id') traceId: string,
    @Res() response,
  ): Promise<any> {
    try {
      const stats: StatsResponseDTO =
        await this.statsService.getStatsOfMutants();

      return response.status(200).json(stats);
    } catch (error) {
      const errorArray = [];
      errorArray.push({
        origin: `${
          SERVICE_ERROR.MUTANTS_API
        }_${StatsController.name.toUpperCase()}_GET_STATS_OF_MUTANTS`,
        trace_id: traceId,
        message: error.message,
      });
      this.logger.error(errorArray);

      return response.status(500).json(errorArray);
    }
  }
}
