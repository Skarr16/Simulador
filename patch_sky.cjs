const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const splitCustom = content.split('{env.id === \'custom\' && (\n        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#fad47c] to-[#f4ba66]">\n           {/* Atmosphere/dust */}\n           <div className="absolute inset-0 bg-[#c1440e]/10 mix-blend-multiply"></div>\n        </div>\n      )}');

if (splitCustom.length === 2) {
    const newSky = `{env.id === 'custom' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#fad47c] to-[#f4ba66]">
           {/* Distant Sun */}
           <div className="absolute top-20 right-[15%] w-12 h-12 bg-[#fff5e6] rounded-full opacity-80 shadow-[0_0_40px_15px_rgba(255,245,230,0.4)]"></div>
           {/* Dust clouds */}
           <svg className="absolute top-24 left-[10%] w-48 h-20 opacity-30 blur-[2px]" viewBox="0 0 100 50">
              <path d="M 25 40 A 15 15 0 0 1 25 10 A 20 20 0 0 1 65 10 A 15 15 0 0 1 85 20 A 15 15 0 0 1 80 40 Z" fill="#e8a87c"/>
           </svg>
           <svg className="absolute top-10 left-[60%] w-64 h-32 opacity-20 blur-[3px]" viewBox="0 0 100 50">
              <path d="M 25 40 A 15 15 0 0 1 25 10 A 20 20 0 0 1 65 10 A 15 15 0 0 1 85 20 A 15 15 0 0 1 80 40 Z" fill="#e8a87c"/>
           </svg>
           <svg className="absolute top-40 left-[80%] w-32 h-16 opacity-30 blur-[1px]" viewBox="0 0 100 50">
              <path d="M 25 40 A 15 15 0 0 1 25 10 A 20 20 0 0 1 65 10 A 15 15 0 0 1 85 20 A 15 15 0 0 1 80 40 Z" fill="#e8a87c"/>
           </svg>
           {/* Atmosphere/dust gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#c1440e]/30 to-transparent mix-blend-multiply"></div>
        </div>
      )}`;
      
    content = splitCustom[0] + newSky + splitCustom[1];
    fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
    console.log('Successfully patched sky');
} else {
    console.log('Split point not found');
}
