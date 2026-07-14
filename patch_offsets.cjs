const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const oldOffsets = `  const mobileOffsets: Record<string, {left: number, bottom: number, width: number, height: number}> = {
    pisa: { left: -19, bottom: -20, width: 97, height: 110 },
    eiffel: { left: -15, bottom: -22, width: 88, height: 108 },
    cristo: { left: -21, bottom: -20, width: 100, height: 98 },
    gize: { left: -50, bottom: -26, width: 144, height: 120 },
    custom: { left: -20, bottom: -24, width: 78, height: 120 }
  };`;

const newOffsets = `  const mobileOffsets: Record<string, {left: number, bottom: number, width: number, height: number}> = {
    pisa: { left: -29, bottom: -25, width: 106, height: 110 },
    eiffel: { left: -24, bottom: -23, width: 91, height: 108 },
    cristo: { left: -33, bottom: -18, width: 119, height: 98 },
    gize: { left: -50, bottom: -35, width: 172, height: 122 },
    custom: { left: -41, bottom: -25, width: 100, height: 120 }
  };`;

code = code.replace(oldOffsets, newOffsets);

fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
