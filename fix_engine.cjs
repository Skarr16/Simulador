const fs = require('fs');
let code = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

code = code.replace(
  /data\.push\(\{\n\s*t, yA: 0, vA: 0, aA: 0, FdA: 0, yB: 0, vB: 0, aB: 0, FdB: 0, parachuteDeployedA: parachuteDeployedA, parachuteDeployedB: parachuteDeployedB\n\s*\}\);/,
  `data.push({
      t, yA: 0, vA: 0, aA: 0, FdA: 0, yB: 0, vB: 0, aB: 0, FdB: 0, 
      parachuteDeployedA: config.simulationMode === 'paraquedas' && config.objectAId === 'skydiver' ? true : false, 
      parachuteDeployedB: config.simulationMode === 'paraquedas' && config.objectBId === 'skydiver' ? true : false
    });`
);

fs.writeFileSync('src/hooks/useEngine.ts', code);
console.log("Fixed useEngine.ts ReferenceError");
