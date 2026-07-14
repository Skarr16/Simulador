const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

code = code.replace(/lg:/g, 'md:');

fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
