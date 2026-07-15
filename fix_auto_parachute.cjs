const fs = require('fs');
let codeEngine = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

const oldDeploy = "const shouldDeploy = manualParachuteTime !== null && t >= manualParachuteTime;";
const newDeploy = `let autoDeploy = config.simulationMode === 'paraquedas' && (config.structureId !== 'custom' || config.height < 700);
        const shouldDeploy = autoDeploy || (manualParachuteTime !== null && t >= manualParachuteTime);`;

codeEngine = codeEngine.replace(oldDeploy, newDeploy);
fs.writeFileSync('src/hooks/useEngine.ts', codeEngine);
