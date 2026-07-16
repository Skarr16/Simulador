const fs = require('fs');
let code = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

code = code.replace(
  /parachuteDeployedA: config\.simulationMode === 'paraquedas', parachuteDeployedB: config\.simulationMode === 'paraquedas'/g,
  'parachuteDeployedA: parachuteDeployedA, parachuteDeployedB: parachuteDeployedB'
);

fs.writeFileSync('src/hooks/useEngine.ts', code);
console.log("Patched useEngine.ts");
