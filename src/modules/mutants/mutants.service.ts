import { Injectable } from '@nestjs/common';

import { LoggerService } from '@shared/logger/logger.service';
import { DnaCodeDTO } from './mutants.dto';
import { StatsService } from '@modules/stats/stats.service';

@Injectable()
export class MutantsService extends LoggerService {
  constructor(private readonly statsService: StatsService) {
    super(MutantsService.name);
  }
  async validateDnaCode(dnaCode: DnaCodeDTO): Promise<boolean> {
    this.logger.log(`Validating DNA Code: ${JSON.stringify(dnaCode)}`);

    const dnaMatrix = dnaCode.dna.map((row) => row.split(''));
    const isMutant = this.hasMutantSequence(dnaMatrix);

    await this.statsService.save({ dna: dnaCode.dna, isMutant });

    return isMutant;
  }

  private hasMutantSequence(dnaMatrix: string[][]): boolean {
    const directions = [
      [1, 0], // Horizontal
      [0, 1], // Vertical
      [1, 1], // Diagonal derecha abajo
      [-1, 1], // Diagonal izquierda abajo
    ];

    return dnaMatrix.some((row, i) =>
      row.some((currentLetter, j) =>
        directions.some(([dx, dy]) =>
          Array.from({ length: 4 }, (_, step) => {
            const x = i + step * dx;
            const y = j + step * dy;

            return (
              x >= 0 &&
              x < dnaMatrix.length &&
              y >= 0 &&
              y < row.length &&
              dnaMatrix[x][y] === currentLetter
            );
          }).every(Boolean),
        ),
      ),
    );
  }
}
