import { Injectable } from '@nestjs/common';

import { LoggerService } from '@shared/logger/logger.service';
import { DnaCodeDTO, MutantResponseDTO } from './mutants.dto';

@Injectable()
export class MutantsService extends LoggerService {
  validateDnaCode(dnaCode: DnaCodeDTO): MutantResponseDTO {
    this.logger.log(`Validating DNA Code: ${JSON.stringify(dnaCode)}`);

    const dnaMatrix = dnaCode.dna.map((row) => row.split(''));

    return this.hasMutantSequence(dnaMatrix)
      ? { isMutant: true }
      : { isMutant: false };
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
