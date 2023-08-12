export interface UnitStatisticsDto {
  unit: string;
  winRate: number;
  pickRate: number;
}

export interface SpellStatisticsDto {
  spell: string;
  winRate: number;
  pickRate: number;
}

export interface RollStatisticsDto {
  roll: string;
  winRate: number;
}

export interface EndingWaveStatisticsDto {
  endingWave: string;
  endingRate: number;
}

export interface LegionStatisticsDto {
  legion: string;
  winRate: number;
  pickRate: number;
}

export interface FirstWaveFightersStatisticsDto {
  fighters: string[];
  winRate: number;
  pickRate: number;
}
