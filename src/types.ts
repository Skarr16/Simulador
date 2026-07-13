export interface PhysicsObject {
  id: string;
  name: string;
  mass: number; // kg
  area: number; // m^2
  cd: number; // drag coefficient
  color: string;
  radius: number; // visual relative size
  image?: string;
  parachuteArea?: number; // m^2
  parachuteCd?: number;
  personMass?: number;
  equipmentMass?: number;
}

export interface Environment {
  id: string;
  name: string;
  g: number; // m/s^2
  rho: number; // kg/m^3
}

export interface SimulationConfig {
  height: number;
  structureId: string;
  objectAId: string;
  objectBId: string;
  environmentId: string;
  enableAirResistance: boolean;
  simulationMode?: 'livre' | 'paraquedas' | 'lancamento';
}

export interface SimulationState {
  t: number;
  yA: number;
  vA: number;
  aA: number;
  FdA: number;
  yB: number;
  vB: number;
  aB: number;
  FdB: number;
  parachuteDeployedA?: boolean;
  parachuteDeployedB?: boolean;
}

export interface SimulationResult {
  id: string;
  config: SimulationConfig;
  timeToFallA: number;
  timeToFallB: number;
  maxK_A: number;
  maxK_B: number;
}

