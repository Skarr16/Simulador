const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /if \(engine\.currentState\.parachuteDeployedB && !prevDeployedB\.current\) \{\n\s*soundEngine\.playParachute\(\);\n\s*\}/,
  `if (config.simulationMode !== 'paraquedas' && engine.currentState.parachuteDeployedB && !prevDeployedB.current) {
      soundEngine.playParachute();
    }`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed App.tsx playParachute B");
