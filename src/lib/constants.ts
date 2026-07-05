import { PhysicsObject, Environment } from '../types';

export const OBJECTS: Record<string, PhysicsObject> = {
  bowling: { id: 'bowling', name: 'Bola de Boliche', mass: 7.26, area: 0.037, cd: 0.47, color: '#1e293b', radius: 120 },
  soccer: { id: 'soccer', name: 'Bola de Futebol', mass: 0.43, area: 0.037, cd: 0.25, color: '#f8fafc', radius: 120 },
  golf: { id: 'golf', name: 'Bola de Golfe', mass: 0.046, area: 0.0014, cd: 0.3, color: '#e2e8f0', radius: 70 },
  pingpong: { id: 'pingpong', name: 'Bola de Ping-Pong', mass: 0.0027, area: 0.0014, cd: 0.4, color: '#f97316', radius: 70 },
  paper_crumpled: { id: 'paper_crumpled', name: 'Papel Amassado', mass: 0.005, area: 0.0028, cd: 0.8, color: '#cbd5e1', radius: 90 },
  paper_flat: { id: 'paper_flat', name: 'Folha de Papel', mass: 0.005, area: 0.06, cd: 1.28, color: '#ffffff', radius: 120 },
  book: { id: 'book', name: 'Livro', mass: 1.0, area: 0.06, cd: 1.05, color: '#b91c1c', radius: 140 },
  feather: { id: 'feather', name: 'Pena', mass: 0.001, area: 0.005, cd: 1.5, color: '#fcd34d', radius: 110 },
};

export const ENVIRONMENTS: Record<string, Environment> = {
  earth: { id: 'earth', name: 'Terra', g: 9.81, rho: 1.225 },
  moon: { id: 'moon', name: 'Lua', g: 1.62, rho: 0 },
};

export const STRUCTURES: Record<string, { id: string; name: string; height: number }> = {
  cristo: { id: 'cristo', name: 'Cristo Redentor', height: 38 },
  pisa: { id: 'pisa', name: 'Torre de Pisa', height: 56 },
  eiffel: { id: 'eiffel', name: 'Torre Eiffel', height: 93 },
  gize: { id: 'gize', name: 'Pirâmide de Gizé', height: 138 },
  custom: { id: 'custom', name: 'Personalizado', height: 50 }
};
