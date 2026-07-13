const fs = require('fs');
const code = fs.readFileSync('src/lib/audio.ts', 'utf-8');

const playImpactCode = `
  playImpact(velocity: number) {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    
    // Create noise buffer for a "puhhff" thud sound
    const bufferSize = this.ctx.sampleRate * 0.3; // 0.3 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Lowpass filter to make it a "puhhff" thud instead of sharp static
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150 + (velocity * 2), this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.2);
    
    const gain = this.ctx.createGain();
    const vol = Math.min(1.0, velocity / 50) * 1.5;
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    noise.start();
  }
`;

const updatedCode = code.replace(/playImpact\(velocity: number\) {[\s\S]*?osc\.stop\(this\.ctx\.currentTime \+ 0\.3\);\n  }/, playImpactCode.trim());

fs.writeFileSync('src/lib/audio.ts', updatedCode);
