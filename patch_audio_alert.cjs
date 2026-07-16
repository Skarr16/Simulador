const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace('private whatsappBuffer: AudioBuffer | null = null;', `private whatsappBuffer: AudioBuffer | null = null;
  private alertBuffer: AudioBuffer | null = null;`);

const fetchCode = `      try {
        const response = await fetch('/sons/whatsapp.mp3?v=' + Date.now());
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          this.whatsappBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        }
      } catch (e) {
        // Suppress error to avoid cluttering logs if the user provided an invalid or empty MP3
        // console.warn('MP3 decode failed, using synthetic fallback', e);
      }`;

const newFetchCode = fetchCode + `
      try {
        const responseAlert = await fetch('/sons/alerta.mp3?v=' + Date.now());
        if (responseAlert.ok) {
          const arrayBufferAlert = await responseAlert.arrayBuffer();
          this.alertBuffer = await this.ctx.decodeAudioData(arrayBufferAlert);
        }
      } catch (e) {}`;

code = code.replace(fetchCode, newFetchCode);

const playWhatsappCode = `  playWhatsapp() {
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

const newPlayAlertCode = playWhatsappCode + `

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

code = code.replace(playWhatsappCode, newPlayAlertCode);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Patched audio.ts");
