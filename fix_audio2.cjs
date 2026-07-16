const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(/  \}\n  \}\n  \}\n  playOvni/, '  }\n  playOvni');

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed audio.ts 2");
