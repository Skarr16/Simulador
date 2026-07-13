const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

// Replace sky background logic
const customSkyReplacement = `{env.id === 'custom' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#fad47c] to-[#f4ba66]">
           {/* Atmosphere/dust */}
           <div className="absolute inset-0 bg-[#c1440e]/10 mix-blend-multiply"></div>
        </div>
      )}`;
      
const splitCustom = content.split('{env.id === \'custom\' && (\n        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#E8C396]">\n           {/* Mars Sun or Sky elements */}\n           <div className="absolute top-16 right-20 w-16 h-16 bg-[#ffeedd] rounded-full opacity-60 shadow-[0_0_30px_10px_rgba(255,238,221,0.3)]"></div>\n           {/* Dust / atmosphere */}\n           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#c1440e]/30"></div>\n        </div>\n      )}');

if (splitCustom.length === 2) {
    content = splitCustom[0] + customSkyReplacement + splitCustom[1];
}

// Replace ground wrapper bg
// We need to find the ground button wrapper
content = content.replace(
    /\$\{env.id === 'moon' \? 'bg-\\[#64748b\\]' : env.id === 'custom' \? 'bg-\\[#b34927\\]' : 'bg-\\[#00C48C\\]'\}/,
    "${env.id === 'moon' ? 'bg-[#64748b]' : env.id === 'custom' ? 'bg-[#95290f]' : 'bg-[#00C48C]'}"
);

// If it was still the old one
content = content.replace(
    /\$\{env.id === 'moon' \? 'bg-\\[#64748b\\]' : 'bg-\\[#00C48C\\]'\}/g,
    "${env.id === 'moon' ? 'bg-[#64748b]' : env.id === 'custom' ? 'bg-[#95290f]' : 'bg-[#00C48C]'}"
);

// Add ground rocks
const groundRocks = `{env.id === 'custom' && (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-90">
            <div className="absolute top-[20%] left-[10%] w-24 h-6 rounded-[50%] bg-[#bd4821] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"></div>
            <div className="absolute top-[50%] left-[65%] w-32 h-8 rounded-[50%] bg-[#bd4821] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"></div>
            <div className="absolute top-[30%] left-[40%] w-16 h-4 rounded-[50%] bg-[#bd4821] shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"></div>
            
            <div className="absolute top-[45%] left-[15%] w-12 h-3 rounded-[50%] bg-[#451004] shadow-[0_1px_2px_rgba(255,255,255,0.1)]"></div>
            <div className="absolute top-[75%] left-[80%] w-14 h-4 rounded-[50%] bg-[#451004] shadow-[0_1px_2px_rgba(255,255,255,0.1)]"></div>
            <div className="absolute top-[60%] left-[30%] w-8 h-2 rounded-[50%] bg-[#451004] shadow-[0_1px_2px_rgba(255,255,255,0.1)]"></div>
          </div>
        )}`;

const splitRocks = content.split('{env.id === \'custom\' && (\n          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-50">\n            <div className="absolute top-[30%] left-[15%] w-16 h-4 rounded-[50%] bg-[#8b3518] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>\n            <div className="absolute top-[60%] left-[75%] w-20 h-6 rounded-[50%] bg-[#8b3518] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>\n            <div className="absolute top-[40%] left-[45%] w-12 h-3 rounded-[50%] bg-[#8b3518] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]"></div>\n          </div>\n        )}');

if (splitRocks.length === 2) {
    content = splitRocks[0] + groundRocks + splitRocks[1];
}

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
console.log('Done!');
