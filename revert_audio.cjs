const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(/skydiverImpactBuffer/g, 'whatsappBuffer');
code = code.replace(/playSkydiverImpact/g, 'playWhatsapp');
code = code.replace(/fetch\('\/sons\/alerta\.mp3\?v=' \+ Date\.now\(\)\)/g, "fetch('/sons/whatsapp.mp3?v=' + Date.now())");
code = code.replace(/fetch\('\/sons\/alexis_gaming_cam-alerte-346112\.mp3\?v=' \+ Date\.now\(\)\)/g, "fetch('/sons/alerta.mp3?v=' + Date.now())");

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Reverted audio.ts");
