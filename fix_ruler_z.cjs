const fs = require('fs');
let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const search = '<div className="absolute inset-0 pointer-events-none z-40">';
const replace = '<div className="absolute inset-0 pointer-events-none z-[60]">';

codeCanvas = codeCanvas.replace(search, replace);
fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);
