const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const maxVCalc = `  const maxVA = engine.dataPoints.length > 0 ? Math.max(0, ...engine.dataPoints.map(dp => Math.abs(dp.vA))) : 0;
  const maxVB = engine.dataPoints.length > 0 ? Math.max(0, ...engine.dataPoints.map(dp => Math.abs(dp.vB))) : 0;`;

const canvasOld = `<SimulationCanvas 
                height={config.height}
                structureId={config.structureId}`;
                
const canvasNew = `${maxVCalc}
              <SimulationCanvas 
                height={config.height}
                structureId={config.structureId}
                maxVA={maxVA}
                maxVB={maxVB}`;
                
content = content.replace(canvasOld, canvasNew);

fs.writeFileSync('src/App.tsx', content);
