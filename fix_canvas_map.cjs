const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

code = code.replace(
  '{/* Gravity Indicator */}\n      .map((_, i) => {',
  '{Array.from({ length: 11 }).map((_, i) => {'
);
fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
