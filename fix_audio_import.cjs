const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(/import whatsappUrl from '\.\.\/\.\.\/sons\/whatsapp\.mp3';\n/g, "");
code = code.replace(/import alertaUrl from '\.\.\/\.\.\/sons\/alerta\.mp3';\n/g, "");

code = code.replace(/const response = await fetch\(whatsappUrl\);/g, "const response = await fetch('/sons/whatsapp.mp3?v=' + Date.now());");
code = code.replace(/const responseAlert = await fetch\(alertaUrl\);/g, "const responseAlert = await fetch('/sons/alerta.mp3?v=' + Date.now());");

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed audio.ts imports");
