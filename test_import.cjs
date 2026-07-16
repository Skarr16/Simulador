const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

if (!code.includes("import whatsappUrl")) {
  code = `import whatsappUrl from '../../sons/whatsapp.mp3';\nimport alertaUrl from '../../sons/alerta.mp3';\n` + code;
  code = code.replace(
    /const response = await fetch\('\/sons\/whatsapp\.mp3\?v=' \+ Date\.now\(\)\);/g,
    "const response = await fetch(whatsappUrl);"
  );
  code = code.replace(
    /const responseAlert = await fetch\('\/sons\/alexis_gaming_cam-alerte-346112\.mp3\?v=' \+ Date\.now\(\)\);/g,
    "const responseAlert = await fetch(alertaUrl);"
  );
  fs.writeFileSync('src/lib/audio.ts', code);
  console.log("Updated audio.ts with imports");
}
