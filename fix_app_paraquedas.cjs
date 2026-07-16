const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the wind sound
code = code.replace(
  /const maxV = Math\.max\(engine\.currentState\.vA, engine\.currentState\.vB\);\n\s*const yPct = Math\.max\(engine\.currentState\.yA, engine\.currentState\.yB\) \/ Math\.max\(config\.height, 1\);\n\s*soundEngine\.updateWind\(maxV, yPct\);/,
  `const maxV = config.simulationMode === 'paraquedas' ? engine.currentState.vA : Math.max(engine.currentState.vA, engine.currentState.vB);
      soundEngine.updateWind(maxV);`
);

// Fix the failure logic
code = code.replace(
  /const isSkydiverB = config\.objectBId === 'skydiver';\n\s*let failed = false;\n\s*\/\/ Check altitude < 600m without parachute\n\s*if \(isSkydiverA && currentState\.yA > 0 && currentState\.yA < 600 && !currentState\.parachuteDeployedA\) \{\n\s*failed = true;\n\s*\}\n\s*if \(isSkydiverB && currentState\.yB > 0 && currentState\.yB < 600 && !currentState\.parachuteDeployedB\) \{\n\s*failed = true;\n\s*\}/,
  `let failed = false;
      
      // Check altitude < 600m without parachute
      if (isSkydiverA && currentState.yA > 0 && currentState.yA < 600 && !currentState.parachuteDeployedA) {
        failed = true;
      }`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed App.tsx logic");
