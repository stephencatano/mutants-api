import { IsBoolean, IsArray, IsString, Matches } from 'class-validator';

export class MutantResponseDTO {
  @IsBoolean()
  isMutant: boolean;
}

export class DnaCodeDTO {
  @IsArray()
  @IsString({ each: true })
  @Matches(/^[ATCG]+$/, {
    each: true,
    message: 'El ADN solo puede contener las letras A, T, C y G.',
  })
  public dna: string[];
}
