export type PoeStage = 'prever' | 'observar' | 'explicar';

export interface SimulationConfig {
  height: number;
  massA: number;
  massB: number;
}

export interface SimulationResult {
  id: string;
  config: SimulationConfig;
  timeToFall: number;
  maxK_A: number;
  maxK_B: number;
  maxU_A: number;
  maxU_B: number;
}

export interface DataPoint {
  time: number;
  y: number;
  v: number;
  k_A: number;
  k_B: number;
  u_A: number;
  u_B: number;
}
