const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

// Update variable names
code = code.replace(/whatsappBuffer/g, 'skydiverImpactBuffer');
code = code.replace(/playWhatsapp/g, 'playSkydiverImpact');

// Update fetch URLs
code = code.replace(/fetch\('\/sons\/whatsapp\.mp3\?v=' \+ Date\.now\(\)\)/g, "fetch('/sons/alerta.mp3?v=' + Date.now())");
code = code.replace(/fetch\('\/sons\/alerta\.mp3\?v=' \+ Date\.now\(\)\)/g, "fetch('/sons/alexis_gaming_cam-alerte-346112.mp3?v=' + Date.now())");

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Updated audio.ts");
