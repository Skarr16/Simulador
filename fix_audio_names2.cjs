const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(
  /const response = await fetch\('\/sons\/alexis_gaming_cam-alerte-346112\.mp3\?v=' \+ Date\.now\(\)\);/,
  "const response = await fetch('/sons/alerta.mp3?v=' + Date.now());"
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed audio.ts fetch");
