const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "{simulationMode === 'single' ? 'MUDO: QUEDA LIVRE' : 'MUDO: QUEDA SIMULTÂNEA'}",
  "{simulationMode === 'single' ? 'MODO: QUEDA LIVRE' : 'MODO: QUEDA SIMULTÂNEA'}"
);

const oldIndicator = `className="absolute top-[80px] lg:top-4 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1.5 rounded-full border-2 border-slate-900 font-black text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-40 whitespace-nowrap pointer-events-none transition-transform duration-300"`;
const newIndicator = `className={\`absolute left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1.5 rounded-full border-2 border-slate-900 font-black text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-40 whitespace-nowrap pointer-events-none transition-all duration-300 \${isHeaderVisible ? 'top-[84px] lg:top-4' : 'top-4'}\`}`;

code = code.replace(oldIndicator, newIndicator);

fs.writeFileSync('src/App.tsx', code);
