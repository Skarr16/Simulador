const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

// remove playWhatsapp entirely
const pwStart = code.indexOf('playWhatsapp() {');
if (pwStart !== -1) {
  const pwEnd = code.indexOf('}', code.indexOf('}', code.indexOf('}', pwStart) + 1) + 1) + 1; // get the closing brace of playWhatsapp
  code = code.slice(0, pwStart) + code.slice(pwEnd);
}

// Fix the load MP3 block
const errorBlockStart = code.indexOf('// Load MP3');
if (errorBlockStart !== -1) {
  const tryStart = code.indexOf('try {', errorBlockStart);
  const endCatch = code.indexOf('} catch (e) { console.error("Audio load error:", e); }', tryStart);
  const nextBrace = code.indexOf('}', endCatch + 54);
  if (tryStart !== -1 && endCatch !== -1 && nextBrace !== -1) {
    code = code.slice(0, errorBlockStart) + code.slice(nextBrace + 1);
  }
}

fs.writeFileSync('src/lib/audio.ts', code);
