const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(
  /async init\(\) \{[\s\S]*?\/\/ Load MP3/,
  `async init() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = 0.5;
      } catch (e) {
        console.error('AudioContext not supported');
        return;
      }
    }
    
    // Load MP3`
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed init");
