const fs = require('fs');
let codeEngine = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

const oldTimeScale = "let timeScale = config.simulationMode === 'paraquedas' ? 10 : 1;";
const newTimeScale = `let timeScale = 1;
    if (config.height > 1000) {
      timeScale = 1 + (config.height - 1000) * (9 / 3000);
    }`;

codeEngine = codeEngine.replace(oldTimeScale, newTimeScale);
fs.writeFileSync('src/hooks/useEngine.ts', codeEngine);

