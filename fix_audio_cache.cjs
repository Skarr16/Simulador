const fs = require('fs');
let codeAudio = fs.readFileSync('src/lib/audio.ts', 'utf8');

const search = "fetch('/sons/whatsapp.mp3');";
const replace = "fetch('/sons/whatsapp.mp3?v=' + Date.now());";

codeAudio = codeAudio.replace(search, replace);
fs.writeFileSync('src/lib/audio.ts', codeAudio);
