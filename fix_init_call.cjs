const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /soundEngine\.init\(\);\n\s+soundEngine\.playClick\(\);/g,
  `soundEngine.init().then(() => soundEngine.playClick());`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed init call");
