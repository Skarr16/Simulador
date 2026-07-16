const fs = require('fs');
let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const search = 'border-slate-900 z-30 flex items-center justify-center';
const replace = 'border-slate-900 z-[20] flex items-center justify-center';

codeCanvas = codeCanvas.replace(search, replace);
fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);
