const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

content = content.replace(
  /\$\{env.id === 'moon' \? 'bg-\\[#1a1a2e\\]' : 'bg-\\[#F4F1EB\\]'\}/g,
  "${env.id === 'moon' ? 'bg-[#1a1a2e]' : env.id === 'custom' ? 'bg-[#E8C396]' : 'bg-[#F4F1EB]'}"
);

content = content.replace(
  /\$\{env.id === 'moon' \? 'bg-\\[#64748b\\]' : 'bg-\\[#00C48C\\]'\}/g,
  "${env.id === 'moon' ? 'bg-[#64748b]' : env.id === 'custom' ? 'bg-[#b34927]' : 'bg-[#00C48C]'}"
);

const earthCode = `{env.id === 'earth' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#87CEEB]">`;
const newCustomSkyCode = `{env.id === 'earth' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#87CEEB]">
      )}
      {env.id === 'custom' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#E8C396]">
           <div className="absolute top-16 right-20 w-16 h-16 bg-[#ffeedd] rounded-full opacity-60 shadow-[0_0_30px_10px_rgba(255,238,221,0.3)]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#c1440e]/30"></div>
        </div>
      )}`;
// Wait, replacing with `earthCode` doesn't work if I just replace `earthCode` because it will lose the rest of earth code. Let's just do it properly.

const split1 = content.split('{env.id === \'earth\' && (\n        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#87CEEB]">\n           {/* Sun */}');
if (split1.length === 2) {
  content = split1[0] + 
    `{env.id === 'custom' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#E8C396]">
           {/* Mars Sun or Sky elements */}
           <div className="absolute top-16 right-20 w-16 h-16 bg-[#ffeedd] rounded-full opacity-60 shadow-[0_0_30px_10px_rgba(255,238,221,0.3)]"></div>
           {/* Dust / atmosphere */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#c1440e]/30"></div>
        </div>
      )}
      
      {env.id === 'earth' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#87CEEB]">
           {/* Sun */}` + split1[1];
}

const split2 = content.split('{env.id === \'moon\' && (\n          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">\n            <div className="absolute top-[30%] left-[15%]');
if (split2.length === 2) {
  content = split2[0] + 
    `{env.id === 'custom' && (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-50">
            <div className="absolute top-[30%] left-[15%] w-16 h-4 rounded-[50%] bg-[#8b3518] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
            <div className="absolute top-[60%] left-[75%] w-20 h-6 rounded-[50%] bg-[#8b3518] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
            <div className="absolute top-[40%] left-[45%] w-12 h-3 rounded-[50%] bg-[#8b3518] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]"></div>
          </div>
        )}
        
        {env.id === 'moon' && (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[30%] left-[15%]` + split2[1];
}

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
console.log('Done patching');
