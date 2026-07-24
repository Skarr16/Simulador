const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/soundEngine\.playSoftImpact\(Math\.max\(prevVA\.current, 10\)\);\s*soundEngine\.playWhatsapp\(\);/g, 'soundEngine.playMetallicImpact(Math.max(prevVA.current, 10));');

code = code.replace(/soundEngine\.playSoftImpact\(Math\.max\(prevVB\.current, 10\)\);\s*soundEngine\.playWhatsapp\(\);/g, 'soundEngine.playMetallicImpact(Math.max(prevVB.current, 10));');

fs.writeFileSync('src/App.tsx', code);
