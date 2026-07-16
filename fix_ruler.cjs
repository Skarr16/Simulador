const fs = require('fs');
let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const search = '<div className="absolute top-0 bottom-[10%] left-0 right-0 pointer-events-none z-10">';
const replace = '<div className="absolute inset-0 pointer-events-none z-10">';

codeCanvas = codeCanvas.replace(search, replace);
fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);
