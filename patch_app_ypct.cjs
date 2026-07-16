const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const maxV = Math\.max\(engine\.currentState\.vA, engine\.currentState\.vB\);\n\s*soundEngine\.updateWind\(maxV\);/,
  `const maxV = Math.max(engine.currentState.vA, engine.currentState.vB);
      const yPct = Math.max(engine.currentState.yA, engine.currentState.yB) / Math.max(config.height, 1);
      soundEngine.updateWind(maxV, yPct);`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched App.tsx");
