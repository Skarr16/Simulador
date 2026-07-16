const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

const playAlertCode = `

  playAlert() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    if (this.alertBuffer) {
      const source = this.ctx.createBufferSource();
      source.buffer = this.alertBuffer;
      const gain = this.ctx.createGain();
      gain.gain.value = 1.0;
      source.connect(gain);
      gain.connect(this.masterGain);
      source.start();
    }
  }`;

code = code.replace(/playWhatsapp\(\) \{[\s\S]*?console\.warn\("Audio buffer not loaded yet"\);\n    \}\n  \}/, match => match + playAlertCode);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Patched audio.ts");
