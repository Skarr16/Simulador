const fs = require('fs');
let codeAudio = fs.readFileSync('src/lib/audio.ts', 'utf8');

// Replace the playWhatsapp method entirely to just play the buffer if it exists
const newPlayWhatsapp = `  playWhatsapp() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;

    if (this.whatsappBuffer) {
      const source = this.ctx.createBufferSource();
      source.buffer = this.whatsappBuffer;
      const gain = this.ctx.createGain();
      gain.gain.value = 1.0;
      source.connect(gain);
      gain.connect(this.masterGain);
      source.start();
    } else {
      console.warn("Audio buffer not loaded yet");
    }
  }`;

codeAudio = codeAudio.replace(/  playWhatsapp\(\) \{[\s\S]*?(?=  playOvni\(\))/m, newPlayWhatsapp + "\n\n");
fs.writeFileSync('src/lib/audio.ts', codeAudio);
