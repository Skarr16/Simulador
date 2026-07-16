const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(
  /\/\/ Load MP3[\s\S]*?\} catch \(e\) \{\}/,
  `// Load MP3
    if (!this.whatsappBuffer) {
      try {
        const response = await fetch('/sons/whatsapp.mp3?v=' + Date.now());
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          this.whatsappBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        }
      } catch (e) {}
    }
    if (!this.alertBuffer) {
      try {
        const responseAlert = await fetch('/sons/alerta.mp3?v=' + Date.now());
        if (responseAlert.ok) {
          const arrayBufferAlert = await responseAlert.arrayBuffer();
          this.alertBuffer = await this.ctx.decodeAudioData(arrayBufferAlert);
        }
      } catch (e) {}
    }`
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed init conditionally");
