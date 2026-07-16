const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(/\/\/ --- Falling Tone Setup ---[\s\S]*?this\.fallOsc\.start\(\);/, '');
code = code.replace(/if \(this\.fallOscGain\) \{[\s\S]*?this\.fallOscGain\.gain\.setTargetAtTime\(0, this\.ctx\.currentTime, 0\.1\);\n    \}/, '');
code = code.replace(/if \(this\.fallOsc\) \{[\s\S]*?this\.fallOscGain = null;\n      \}/, '');
code = code.replace(/private fallOsc: OscillatorNode \| null = null;/, '');
code = code.replace(/private fallOscGain: GainNode \| null = null;/, '');

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Cleaned fallOsc from audio.ts");
