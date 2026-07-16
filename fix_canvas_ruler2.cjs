const fs = require('fs');
let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');
codeCanvas = codeCanvas.replace(
  "top-[45%] bottom-[10%]",
  "top-[35%] bottom-[10%]"
);
fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);
