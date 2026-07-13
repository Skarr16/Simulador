const fs = require('fs');
const code = fs.readFileSync('src/lib/audio.ts', 'utf-8');

const playClickCode = `
  playClick() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }
`;

const updatedCode = code.replace("playImpact(velocity: number) {", playClickCode + "\n  playImpact(velocity: number) {");

fs.writeFileSync('src/lib/audio.ts', updatedCode);
