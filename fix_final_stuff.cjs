const fs = require('fs');
let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

// Fix moon text color
const oldMoonText = "${env.id === 'moon' ? 'bg-[#1a1a2e] border-white' : env.id === 'custom' ? 'bg-[#f4ba66] border-[#451004] text-[#451004]' : 'bg-[#F4F1EB] border-slate-900'}";
const newMoonText = "${env.id === 'moon' ? 'bg-[#1a1a2e] border-white text-white' : env.id === 'custom' ? 'bg-[#f4ba66] border-[#451004] text-[#451004]' : 'bg-[#F4F1EB] border-slate-900'}";
codeCanvas = codeCanvas.replace(oldMoonText, newMoonText);
fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);

let codeAudio = fs.readFileSync('src/lib/audio.ts', 'utf8');
const oldAudio = "gain.gain.setValueAtTime(0.5, this.ctx.currentTime);\n    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.5); // fly in\n    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 2.0); // fly away\n    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 2.9);";
const newAudio = "gain.gain.setValueAtTime(2.0, this.ctx.currentTime);\n    gain.gain.linearRampToValueAtTime(1.5, this.ctx.currentTime + 0.5); // fly in\n    gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 2.0); // fly away\n    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 2.9);";
codeAudio = codeAudio.replace(oldAudio, newAudio);
fs.writeFileSync('src/lib/audio.ts', codeAudio);

