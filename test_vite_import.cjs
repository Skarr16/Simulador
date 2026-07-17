const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = `import whatsappSnd from '../../public/sons/whatsapp.mp3';
import alertaSnd from '../../public/sons/alerta.mp3';\n` + code;

code = code.replace(
  /fetch\('\/sons\/whatsapp\.mp3\?v=' \+ Date\.now\(\)\)/g,
  "fetch(whatsappSnd)"
);
code = code.replace(
  /fetch\('\/sons\/alerta\.mp3\?v=' \+ Date\.now\(\)\)/g,
  "fetch(alertaSnd)"
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Updated audio.ts with imports");
