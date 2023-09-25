import { Injectable } from '@nestjs/common';

import { LoggerService } from '@shared/logger/logger.service';
import { DnaCodeDTO, MutantResponseDTO } from './mutants.dto';

@Injectable()
export class MutantsService extends LoggerService {
  validateDnaCode(dnaCode: DnaCodeDTO): MutantResponseDTO {
    this.logger.log(`Validating DNA Code: ${JSON.stringify(dnaCode)}`);
    return { isMutant: true };
  }
}
