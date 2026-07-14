const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const propsInterfaceOld = `  parachuteDeployedB?: boolean;
  simulationMode?: string;
  speedMultiplier?: number;
}`;
const propsInterfaceNew = `  parachuteDeployedB?: boolean;
  simulationMode?: string;
  speedMultiplier?: number;
  maxVA?: number;
  maxVB?: number;
}`;

content = content.replace(propsInterfaceOld, propsInterfaceNew);

const destructureOld = `  parachuteDeployedB,
  simulationMode,
  speedMultiplier = 1
}: SimulationCanvasProps) {`;
const destructureNew = `  parachuteDeployedB,
  simulationMode,
  speedMultiplier = 1,
  maxVA = 0,
  maxVB = 0
}: SimulationCanvasProps) {`;
content = content.replace(destructureOld, destructureNew);

const tooltipOld = `                 <div className="font-black border-b border-slate-700 pb-1 mb-1">{obj.name}</div>
                 <div>Massa: {obj.mass.toFixed(3)} kg</div>
                 <div>Velocidade: {currentV.toFixed(1)} m/s</div>
                 <div>Área: {parachuteDeployed && obj.id === 'skydiver' ? (obj.area + 5).toFixed(2) : obj.area} m²</div>`;

const tooltipNew = `                 <div className="font-black border-b border-slate-700 pb-1 mb-1">{obj.name}</div>
                 <div>Massa: {obj.mass.toFixed(3)} kg</div>
                 <div>Velocidade: {currentV.toFixed(1)} m/s</div>
                 {(currentY <= 0 && currentV === 0) && <div>Velocidade Máx: {(letter === 'A' ? maxVA : maxVB).toFixed(1)} m/s</div>}
                 <div>Área: {parachuteDeployed && obj.id === 'skydiver' ? (obj.area + 5).toFixed(2) : obj.area} m²</div>`;

content = content.replace(tooltipOld, tooltipNew);

// Also fix image for custom box
content = content.replace(/obj\.id === 'custom'/g, "obj.id.startsWith('custom')");

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
