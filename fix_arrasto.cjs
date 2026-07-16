const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

code = code.replace(/FdA\.toFixed\(1\)/g, "FdA.toFixed(3)");
code = code.replace(/FdB\.toFixed\(1\)/g, "FdB.toFixed(3)");

fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
console.log("Fixed Arrasto formatting");
