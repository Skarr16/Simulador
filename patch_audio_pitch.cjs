const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(/updateWind\(velocity: number\) \{/, 'updateWind(velocity: number, yPct: number = 1) {');
code = code.replace(/const pitch = Math\.max\(100, 800 - \(velocity \* 5\)\);/, 'const pitch = 100 + (700 * yPct);');

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Patched audio.ts");
