export interface StatsForCreateDTO {
  dna: string[];
  isMutant: boolean;
}

export interface StatsMappedForCreateDTO {
  dna_code: string[];
  is_mutant: boolean;
}

export interface StatsResponseDTO {
  count_mutant_dna: number;
  count_human_dna: number;
  ratio: number;
}
