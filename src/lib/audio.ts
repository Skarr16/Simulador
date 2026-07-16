class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  public isEnabled: boolean = true;

  private windNode: AudioBufferSourceNode | null = null;
  private windGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;

  
  

  private whatsappBuffer: AudioBuffer | null = null;
  private alertBuffer: AudioBuffer | null = null;

  async init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = 0.5;
      
      // Load MP3
      try {
        const response = await fetch('/sons/whatsapp.mp3?v=' + Date.now());
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          this.whatsappBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        }
      } catch (e) {
        // Suppress error to avoid cluttering logs if the user provided an invalid or empty MP3
        // console.warn('MP3 decode failed, using synthetic fallback', e);
      }
      try {
        const responseAlert = await fetch('/sons/alerta.mp3?v=' + Date.now());
        if (responseAlert.ok) {
          const arrayBufferAlert = await responseAlert.arrayBuffer();
          this.alertBuffer = await this.ctx.decodeAudioData(arrayBufferAlert);
        }
      } catch (e) {}
    } catch (e) {
      console.error('AudioContext not supported');
    }
  }

  toggle(enabled: boolean) {
    this.isEnabled = enabled;
    if (enabled && !this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended' && enabled) {
      this.ctx.resume();
    }
    if (!enabled && this.windNode) {
      this.stopWind();
    }
  }

  
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

  playSoftImpact(velocity: number) {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, this.ctx.currentTime);
    
    const gain = this.ctx.createGain();
    const vol = Math.min(1.0, velocity / 30) * 0.5;
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(this.ctx.currentTime);
    noise.stop(this.ctx.currentTime + 0.3);
  }

  playMetallicImpact(velocity: number) {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    
    // Mix two oscillators for a metallic clang
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.2);
    
    const vol = Math.min(1.0, velocity / 50) * 0.6;
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);
    
    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.25);
    osc2.stop(this.ctx.currentTime + 0.25);
  }

  playWhatsapp() {
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
  }

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
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.6);
      osc.stop(this.ctx.currentTime + 0.6);
  }
  }
  playOvni() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    lfo.type = 'sine';
    
    // Base frequency
    osc.frequency.value = 400;
    
    // LFO controls frequency to give that wobbly sci-fi sound
    lfo.frequency.value = 8;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 50;
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    // Envelope - lower volume and fades out over 3 seconds (when it leaves screen)
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 1.5);
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

    // A deeper rumble for spaceship
    const osc1 = this.ctx.createOscillator();
    const noise = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle'; // triangle is less strident than sawtooth
    
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
    filter.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 3);
    
    noise.connect(filter);
    filter.connect(gain);
    osc1.connect(gain);

    // Envelope - fades out over 3 seconds as the ship flies away
    gain.gain.setValueAtTime(4.0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(3.0, this.ctx.currentTime + 0.5); // fly in
    gain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + 2.0); // fly away
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2.9);
    gain.gain.setValueAtTime(0, this.ctx.currentTime + 3.0); // gone

    gain.connect(this.masterGain);

    osc1.start(this.ctx.currentTime);
    noise.start(this.ctx.currentTime);
    
    osc1.stop(this.ctx.currentTime + 3.0);
    noise.stop(this.ctx.currentTime + 3.0);
  }

  playAirplane() {
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
  }

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
    noise.start(this.ctx.currentTime);
    noise.stop(this.ctx.currentTime + 0.5);
  }

  playParachute() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    
    const bufferSize = this.ctx.sampleRate * 0.5; // 0.5 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.1));
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    noise.start();
  }

  startWind() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    if (this.windNode) return; // Already playing

    // --- Wind Noise Setup ---
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    this.windNode = this.ctx.createBufferSource();
    this.windNode.buffer = buffer;
    this.windNode.loop = true;
    
    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.value = 400; // Will be modulated
    
    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0; // Starts at 0
    
    this.windNode.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    
    this.windNode.start();

    
  }

  updateWind(velocity: number, yPct: number = 1) {
    if (!this.isEnabled || !this.windGain || !this.ctx || !this.windFilter) return;
    
    // Max wind sound around 80 m/s
    const windVol = Math.min(1.0, velocity / 80) * 0.5;
    this.windGain.gain.setTargetAtTime(windVol, this.ctx.currentTime, 0.1);
    
    const windFreq = 200 + (velocity * 20);
    this.windFilter.frequency.setTargetAtTime(Math.min(windFreq, 3000), this.ctx.currentTime, 0.1);

    
  }

  stopWind() {
    if (!this.ctx) return;
    
    if (this.windGain) {
      this.windGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }
    
    
    // Stop and clear after fade
    setTimeout(() => {
      if (this.windNode) {
        try { this.windNode.stop(); } catch(e) {}
        this.windNode = null;
        this.windGain = null;
        this.windFilter = null;
      }
      
    }, 200);
  }
}

export const soundEngine = new SoundEngine();
