import { PhysicsObject, Environment } from '../types';

export const OBJECTS: Record<string, PhysicsObject> = {
  bowling: { id: 'bowling', name: 'Bola de Boliche', diameterInfo: 'Ø 21.7cm', mass: 7.26, area: 0.037, cd: 0.47, color: '#1e293b', radius: 120, image: '/objetos/bola de boliche.png' },
  soccer: { id: 'soccer', name: 'Bola de Futebol', diameterInfo: 'Ø 21.7cm', mass: 0.43, area: 0.037, cd: 0.46, color: '#f8fafc', radius: 120, image: '/objetos/bola de futebol.png' },
  golf: { id: 'golf', name: 'Bola de Golfe', diameterInfo: 'Ø 4.2cm', mass: 0.046, area: 0.0014, cd: 0.3, color: '#e2e8f0', radius: 70, image: '/objetos/bola de golf.png' },
  pingpong: { id: 'pingpong', name: 'Bola de Ping-Pong', diameterInfo: 'Ø 4.2cm', mass: 0.0027, area: 0.0014, cd: 0.4, color: '#f97316', radius: 70, image: '/objetos/bola de ping-pong.png' },
  paper_crumpled: { id: 'paper_crumpled', name: 'Papel Amassado', mass: 0.005, area: 0.0028, cd: 0.8, color: '#cbd5e1', radius: 90, image: '/objetos/papel amassado.png' },
  paper_flat: { id: 'paper_flat', name: 'Folha de Papel', mass: 0.005, area: 0.06, cd: 1.28, color: '#ffffff', radius: 120, image: '/objetos/papel.png' },
  book: { id: 'book', name: 'Livro', mass: 1.0, area: 0.06, cd: 1.05, color: '#b91c1c', radius: 140, image: '/objetos/livro.png' },
  feather: { id: 'feather', name: 'Pena', mass: 0.001, area: 0.005, cd: 1.5, color: '#fcd34d', radius: 80, image: '/objetos/pena.png' },
  skydiver: { id: 'skydiver', name: 'Paraquedista', mass: 75.0, personMass: 65.0, equipmentMass: 10.0, area: 0.35, cd: 1.0, color: '#FF3366', radius: 250, parachuteArea: 25, parachuteCd: 1.75 },
  astronaut: { id: 'astronaut', name: 'Astronauta', mass: 100.0, area: 0.9, cd: 1.2, color: '#A855F7', radius: 150 },
  customA: { id: 'customA', name: 'Personalizado A', mass: 1, area: 1, cd: 1.05, color: '#888', radius: 140, image: '/objetos/caixa (1).png' },
  customB: { id: 'customB', name: 'Personalizado B', mass: 1, area: 1, cd: 1.05, color: '#888', radius: 140, image: '/objetos/caixa (1).png' },
  et: { id: 'et', name: 'ET', mass: 45.0, area: 0.5, cd: 1.0, color: '#22c55e', radius: 150 },
};

export const ENVIRONMENTS: Record<string, Environment> = {
  earth: { id: 'earth', name: 'Terra', g: 9.81, rho: 1.225 },
  moon: { id: 'moon', name: 'Lua', g: 1.62, rho: 0 },
  custom: { id: 'custom', name: 'Personalizado', g: 3.71, rho: 0.020 },
};

export const STRUCTURES: Record<string, { id: string; name: string; height: number; image?: string }> = {
  cristo: { id: 'cristo', name: 'Cristo Redentor', height: 38, image: '/estruturas/cristo redentor.png' },
  pisa: { id: 'pisa', name: 'Torre de Pisa', height: 56, image: '/estruturas/torre de pisa.png' },
  eiffel: { id: 'eiffel', name: 'Torre Eiffel', height: 93, image: '/estruturas/torre effel.png' },
  gize: { id: 'gize', name: 'Pirâmide de Gizé', height: 138, image: '/estruturas/piramide de gize.png' },
  custom: { id: 'custom', name: 'Personalizado', height: 50 }
};
