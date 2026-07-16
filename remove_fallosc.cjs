const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

// Remove fallOsc usage
code = code.replace(/if \(this\.fallOsc && this\.fallOscGain\) \{[\s\S]*?\}/, '');

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Removed fallOsc from updateWind");
