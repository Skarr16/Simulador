const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

// Replace relative paths with absolute public path or something Vite likes without errors, or add @ts-ignore
code = code.replace(/import whatsappAudio from '\.\.\/\.\.\/public\/sons\/whatsapp\.mp3';/, "// @ts-ignore\nimport whatsappAudio from '../../public/sons/whatsapp.mp3';");
code = code.replace(/import alertaAudio from '\.\.\/\.\.\/public\/sons\/alerta\.mp3';/, "// @ts-ignore\nimport alertaAudio from '../../public/sons/alerta.mp3';");

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed audio imports");
