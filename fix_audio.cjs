const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

// Stop oscillator for synthetic fallback of playAlert
code = code.replace(
  /gain\.gain\.exponentialRampToValueAtTime\(0\.01, this\.ctx\.currentTime \+ 0\.6\);\s+osc\.connect\(gain\);\s+gain\.connect\(this\.masterGain\);\s+osc\.start\(\);/,
  `gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.6);`
);

// Add stop for noise in playImpact
code = code.replace(
  /gain\.connect\(this\.masterGain\);\s+noise\.start\(\);/,
  `gain.connect(this.masterGain);
    noise.start(this.ctx.currentTime);
    noise.stop(this.ctx.currentTime + 0.3);`
);

// Add stop for noise in playParachute
code = code.replace(
  /gain\.connect\(this\.masterGain\);\s+noise\.start\(\);/,
  `gain.connect(this.masterGain);
    noise.start(this.ctx.currentTime);
    noise.stop(this.ctx.currentTime + 0.5);`
);

// Also set isEnabled to true by default, because App.tsx toggles.sound is true by default
code = code.replace(/public isEnabled: boolean = false;/, `public isEnabled: boolean = true;`);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed audio stops");
