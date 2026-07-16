const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

const newPlayAlert = `
  playAlert() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.alertBuffer) {
      const source = this.ctx.createBufferSource();
      source.buffer = this.alertBuffer;
      const gain = this.ctx.createGain();
      gain.gain.value = 1.0;
      source.connect(gain);
      gain.connect(this.masterGain);
      source.start();
    } else {
      // Synthetic fallback
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.setValueAtTime(600, this.ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(400, this.ctx.currentTime + 0.4);
      
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    }
  }`;

code = code.replace(/playAlert\(\) \{[\s\S]*?source\.start\(\);\n    \}/, newPlayAlert.trim());

// Also fix the fall pitch
code = code.replace(/const pitch = 100 \+ \(700 \* yPct\);/g, 'const pitch = 400;'); // Constant pitch, or just remove it

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Patched audio.ts");
