const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

const playAlertRegex = /playAlert\(\) \{[\s\S]*?osc\.start\(\);\n    \}\n  \}/;
code = code.replace(playAlertRegex, `playAlert() {
    if (!this.isEnabled) return;
    try {
      const audio = new Audio(alertaSnd);
      audio.volume = 1.0;
      audio.play().catch(e => console.error(e));
    } catch (e) { console.error(e); }
  }`);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed playAlert");
