import { StatsOfMutantsEntity } from '@entities/stats.entity';
import {
  StatsForCreateDTO,
  StatsMappedForCreateDTO,
  StatsResponseDTO,
} from '@modules/stats/interfaces/i-stats';

export const calcStatsOfMutants = (
  stats: StatsOfMutantsEntity[],
): StatsResponseDTO => {
  const mutants: StatsOfMutantsEntity[] = stats.filter(
    (stat) => stat?.is_mutant,
  );
  const humans: StatsOfMutantsEntity[] = stats.filter(
    (stat) => !stat?.is_mutant,
  );
  const ratio: number =
    mutants.length === 0
      ? 0
      : mutants.length / (humans.length + mutants.length);

  return {
    count_mutant_dna: mutants.length,
    count_human_dna: humans.length,
    ratio: parseFloat(ratio.toFixed(1)),
  };
};

export const mapStatsToEntity = (
  stats: StatsForCreateDTO,
): StatsMappedForCreateDTO => {
  return {
    dna_code: stats.dna,
    is_mutant: stats.isMutant,
  };
};
