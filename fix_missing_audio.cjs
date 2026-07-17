const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

const additionalMethods = `
  playOvni() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    lfo.type = 'sine';
    
    osc.frequency.value = 400;
    
    lfo.frequency.value = 8;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 50;
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2.5);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 3);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(this.ctx.currentTime);
    lfo.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 3);
    lfo.stop(this.ctx.currentTime + 3);
  }

  playAstronautShip() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    
    const osc1 = this.ctx.createOscillator();
    const noise = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    osc1.type = 'triangle'; 
    
    osc1.frequency.setValueAtTime(50, this.ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(30, this.ctx.currentTime + 3);
    
    const bufferSize = this.ctx.sampleRate * 3.0; 
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 3);
    
    noise.connect(filter);
    filter.connect(gain);
    osc1.connect(gain);
    
    gain.gain.setValueAtTime(4.0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(3.0, this.ctx.currentTime + 0.5);
    gain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + 2.0);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2.9);
    gain.gain.setValueAtTime(0, this.ctx.currentTime + 3.0);
    
    gain.connect(this.masterGain);
    osc1.start(this.ctx.currentTime);
    noise.start(this.ctx.currentTime);
    
    osc1.stop(this.ctx.currentTime + 3.0);
    noise.stop(this.ctx.currentTime + 3.0);
  }

  playAirplane() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    
    const osc = this.ctx.createOscillator();
    const noise = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 3);
    
    const bufferSize = this.ctx.sampleRate * 3.0; 
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 3);
    
    noise.connect(filter);
    filter.connect(gain);
    osc.connect(gain);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 1.0); 
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 3.0); 
    
    gain.connect(this.masterGain);
    osc.start(this.ctx.currentTime);
    noise.start(this.ctx.currentTime);
    
    osc.stop(this.ctx.currentTime + 3.0);
    noise.stop(this.ctx.currentTime + 3.0);
  }
`;

code = code.replace(
  /stopWind\(\) \{/,
  additionalMethods + "\n  stopWind() {"
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Added missing methods");
