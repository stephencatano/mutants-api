import { IsBoolean, IsArray } from 'class-validator';

export class MutantResponseDTO {
  @IsBoolean()
  isMutant: boolean;
}

export class DnaCodeDTO {
  @IsArray()
  public dna: string[];
}
