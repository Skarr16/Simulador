const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/soundEngine\.playSkydiverImpact\(\)/g, 'soundEngine.playWhatsapp()');

fs.writeFileSync('src/App.tsx', code);
console.log("Reverted App.tsx");
