const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

code = code.replace(
  '{Array.from({ length: 11 }).map((_, i) => {',
  '<div className="absolute top-0 bottom-[10%] left-0 right-0 pointer-events-none z-10">\n        {Array.from({ length: 11 }).map((_, i) => {'
);
fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
