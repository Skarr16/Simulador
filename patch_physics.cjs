const fs = require('fs');

let content = fs.readFileSync('src/hooks/useEngine.ts', 'utf8');

// Fix FdA and vA calculations
content = content.replace(
    /let FdA = 0;\n      if \(config\.enableAirResistance && yA > 0\) \{\n        FdA = 0\.5 \* env\.rho \* vA \* vA \* currentCdA \* currentAreaA;\n      \}\n      let aA = env\.g - \(FdA \/ objectA\.mass\);\n      if \(yA <= 0\) \{\n        aA = 0; vA = 0; yA = 0; FdA = 0;\n      \}/g,
    "let FdA = 0;\n      if (config.enableAirResistance && yA > 0) {\n        FdA = 0.5 * env.rho * vA * Math.abs(vA) * currentCdA * currentAreaA;\n      }\n      let aA = env.g - (FdA / objectA.mass);\n      if (yA <= 0) {\n        aA = 0; vA = 0; yA = 0; FdA = 0;\n      }"
);

content = content.replace(
    /let FdB = 0;\n      if \(config\.enableAirResistance && yB > 0\) \{\n        FdB = 0\.5 \* env\.rho \* vB \* vB \* currentCdB \* currentAreaB;\n      \}\n      let aB = env\.g - \(FdB \/ objectB\.mass\);\n      if \(yB <= 0\) \{\n        aB = 0; vB = 0; yB = 0; FdB = 0;\n      \}/g,
    "let FdB = 0;\n      if (config.enableAirResistance && yB > 0) {\n        FdB = 0.5 * env.rho * vB * Math.abs(vB) * currentCdB * currentAreaB;\n      }\n      let aB = env.g - (FdB / objectB.mass);\n      if (yB <= 0) {\n        aB = 0; vB = 0; yB = 0; FdB = 0;\n      }"
);

content = content.replace(
    /if \(yA > 0\) \{\n        vA \+= aA \* dt;\n        yA -= vA \* dt;\n      \}/g,
    "if (yA > 0) {\n        let vtA = config.enableAirResistance && currentAreaA > 0 ? Math.sqrt((2 * objectA.mass * env.g) / (env.rho * currentCdA * currentAreaA)) : Infinity;\n        if (vA > vtA && vA + aA * dt < vtA) {\n          vA = vtA;\n        } else {\n          vA += aA * dt;\n        }\n        yA -= vA * dt;\n      }"
);

content = content.replace(
    /if \(yB > 0\) \{\n        vB \+= aB \* dt;\n        yB -= vB \* dt;\n      \}/g,
    "if (yB > 0) {\n        let vtB = config.enableAirResistance && currentAreaB > 0 ? Math.sqrt((2 * objectB.mass * env.g) / (env.rho * currentCdB * currentAreaB)) : Infinity;\n        if (vB > vtB && vB + aB * dt < vtB) {\n          vB = vtB;\n        } else {\n          vB += aB * dt;\n        }\n        yB -= vB * dt;\n      }"
);

fs.writeFileSync('src/hooks/useEngine.ts', content);
console.log('patched');
