const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(
  /playWhatsapp\(\) \{[\s\S]*?\} else \{[\s\S]*?console\.warn\("Audio buffer not loaded yet"\);\n    \}\n  \}/,
  `playWhatsapp() {
    if (!this.isEnabled) return;
    try {
      const audio = new Audio(whatsappSnd);
      audio.volume = 1.0;
      audio.play().catch(e => console.error(e));
    } catch (e) { console.error(e); }
  }`
);

code = code.replace(
  /playAlert\(\) \{[\s\S]*?\/\/ Synthetic fallback[\s\S]*?osc\.start\(\);\n  \}/,
  `playAlert() {
    if (!this.isEnabled) return;
    try {
      const audio = new Audio(alertaSnd);
      audio.volume = 1.0;
      audio.play().catch(e => console.error(e));
    } catch (e) { console.error(e); }
  }`
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Updated to use HTMLAudioElement");
