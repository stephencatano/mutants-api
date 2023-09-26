import { Body, Controller, Post, Headers, Res } from '@nestjs/common';

import { LoggerService } from '@shared/logger/logger.service';
import { SERVICE_ERROR } from '@config/errors.enum';
import { MutantsService } from './mutants.service';
import { DnaCodeDTO } from './mutants.dto';

@Controller('mutant')
export class MutantsController extends LoggerService {
  constructor(private readonly mutantsService: MutantsService) {
    super(MutantsController.name);
  }

  @Post('/')
  async validateDnaCode(
    @Headers('trace_id') traceId: string,
    @Body() dnaCode: DnaCodeDTO,
    @Res() response,
  ): Promise<any> {
    try {
      const isMutant: boolean =
        await this.mutantsService.validateDnaCode(dnaCode);

      return isMutant
        ? response.status(200).json({ isMutant })
        : response.status(403).json({ isMutant });
    } catch (error) {
      const errorArray = [];
      errorArray.push({
        origin: `${
          SERVICE_ERROR.MUTANTS_API
        }_${MutantsController.name.toUpperCase()}_VALIDATE_DNA_CODE`,
        trace_id: traceId,
        message: error.message,
      });
      this.logger.error(errorArray);

      return response.status(500).json(errorArray);
    }
  }
}
