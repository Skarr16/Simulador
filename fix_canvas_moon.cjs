const fs = require('fs');
let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

// Force text white on moon
const oldMoonText = 'bg-[#1a1a2e] border-white text-white';
const newMoonText = 'bg-[#1a1a2e] border-white !text-white';
codeCanvas = codeCanvas.replace(oldMoonText, newMoonText);

fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);

let codeAudio = fs.readFileSync('src/lib/audio.ts', 'utf8');
const oldAudio = "gain.gain.setValueAtTime(2.0, this.ctx.currentTime);\n    gain.gain.linearRampToValueAtTime(1.5, this.ctx.currentTime + 0.5); // fly in\n    gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 2.0); // fly away\n    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 2.9);";
const newAudio = "gain.gain.setValueAtTime(4.0, this.ctx.currentTime);\n    gain.gain.linearRampToValueAtTime(3.0, this.ctx.currentTime + 0.5); // fly in\n    gain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + 2.0); // fly away\n    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2.9);";
codeAudio = codeAudio.replace(oldAudio, newAudio);
fs.writeFileSync('src/lib/audio.ts', codeAudio);
