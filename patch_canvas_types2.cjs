const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');
const oldProps = `interface SimulationCanvasProps {
  height: number;
  structureId?: string;
  resetCount: number;`;
const newProps = `interface SimulationCanvasProps {
  height: number;
  structureId?: string;
  maxVA?: number;
  maxVB?: number;
  resetCount: number;`;
content = content.replace(oldProps, newProps);
fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
