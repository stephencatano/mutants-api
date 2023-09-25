import { Body, Controller, Post, Headers, Response } from '@nestjs/common';

import { LoggerService } from '@shared/logger/logger.service';
import { SERVICE_ERROR } from '@config/errors.enum';
import { MutantsService } from './mutants.service';
import { DnaCodeDTO, MutantResponseDTO } from './mutants.dto';

@Controller('mutant')
export class MutantsController extends LoggerService {
  constructor(private readonly mutantsService: MutantsService) {
    super(MutantsController.name);
  }

  @Post('/')
  async validateDnaCode(
    @Headers('trace_id') traceId: string,
    @Body() dnaCode: DnaCodeDTO,
    @Response() response,
  ): Promise<any> {
    try {
      const { isMutant }: MutantResponseDTO =
        this.mutantsService.validateDnaCode(dnaCode);

      return isMutant
        ? response.status(200).json({ isMutant })
        : response.status(403).json({ isMutant });
    } catch (error) {
      const errorArray = [];
      errorArray.push({
        origin: `${SERVICE_ERROR.MUTANTS_API}_VALIDATE_DNA_CODE`,
        trace_id: traceId,
        message: error.message,
      });
      this.logger.error(errorArray);

      return response.status(500).json(errorArray);
    }
  }
}
