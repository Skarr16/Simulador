const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const oldDestruct = `export function SimulationCanvas({ 
  height, structureId, resetCount, yA, yB, vA, vB, FdA, FdB, objectA, objectB, env, showVectors, showHeights, showGravity, devMode, parachuteDeployedA, parachuteDeployedB, simulationMode, speedMultiplier = 1, onSpeedChange, onToggleEnv 
}: SimulationCanvasProps) {`;

const newDestruct = `export function SimulationCanvas({ 
  height, structureId, resetCount, yA, yB, vA, vB, FdA, FdB, objectA, objectB, env, showVectors, showHeights, showGravity, devMode, parachuteDeployedA, parachuteDeployedB, simulationMode, speedMultiplier = 1, onSpeedChange, onToggleEnv, maxVA = 0, maxVB = 0
}: SimulationCanvasProps) {`;

content = content.replace(oldDestruct, newDestruct);

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
