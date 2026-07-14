const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

const oldAstronaut = `    osc1.type = 'sawtooth';
    
    // Very low pitch rumble
    osc1.frequency.setValueAtTime(40, this.ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(20, this.ctx.currentTime + 3);

    // Noise for thrust
    const bufferSize = this.ctx.sampleRate * 3.0; // 3 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;
    
    // Noise filter - lowpass for deep roar
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 3);`;

const newAstronaut = `    osc1.type = 'triangle'; // triangle is less strident than sawtooth
    
    // Very low pitch rumble
    osc1.frequency.setValueAtTime(50, this.ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(30, this.ctx.currentTime + 3);

    // Noise for thrust
    const bufferSize = this.ctx.sampleRate * 3.0; // 3 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Reduce noise harshness
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    noise.buffer = buffer;
    
    // Noise filter - much lower pass for a muffled deep roar
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 3);`;

code = code.replace(oldAstronaut, newAstronaut);
fs.writeFileSync('src/lib/audio.ts', code);
