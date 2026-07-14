const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

// Replace playAstronautShip
const newAstronautShip = `  playAstronautShip() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;

    // A deeper rumble for spaceship
    const osc1 = this.ctx.createOscillator();
    const noise = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    
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
    filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 3);
    
    noise.connect(filter);
    filter.connect(gain);
    osc1.connect(gain);

    // Envelope - fades out over 3 seconds as the ship flies away
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.5); // fly in
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2.0); // fly away
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 2.9);
    gain.gain.setValueAtTime(0, this.ctx.currentTime + 3.0); // gone

    gain.connect(this.masterGain);

    osc1.start(this.ctx.currentTime);
    noise.start(this.ctx.currentTime);
    
    osc1.stop(this.ctx.currentTime + 3.0);
    noise.stop(this.ctx.currentTime + 3.0);
  }`;

code = code.replace(/  playAstronautShip\(\) \{[\s\S]*?osc2\.stop\(this\.ctx\.currentTime \+ 3\);\n  \}/, newAstronautShip);

// Add playAirplane
const newAirplane = `  playAirplane() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;

    // Airplane jet/propeller sound
    const osc = this.ctx.createOscillator();
    const noise = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();

    // Whine for jet
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 3); // Doppler effect

    // Noise for air
    const bufferSize = this.ctx.sampleRate * 3.0; 
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;
    
    // Noise filter - bandpass for airplane
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 3);
    
    noise.connect(filter);
    filter.connect(gain);
    
    // Balance whine vs noise
    const oscGain = this.ctx.createGain();
    oscGain.gain.value = 0.2;
    osc.connect(oscGain);
    oscGain.connect(gain);

    // Envelope - fades out over 3 seconds
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.3); // approach
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2.0); // fly away
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 2.9);
    gain.gain.setValueAtTime(0, this.ctx.currentTime + 3.0); // gone

    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    noise.start(this.ctx.currentTime);
    
    osc.stop(this.ctx.currentTime + 3.0);
    noise.stop(this.ctx.currentTime + 3.0);
  }`;

code = code.replace(/  playImpact\(velocity: number\) \{/, newAirplane + '\n\n  playImpact(velocity: number) {');

fs.writeFileSync('src/lib/audio.ts', code);
