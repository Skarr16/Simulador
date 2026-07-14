const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix the Header for PC (lg:translate-y-0)
const oldHeader = "className={`bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible transition-transform duration-300 absolute top-0 left-0 right-0 lg:relative ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}";
const newHeader = "className={`bg-white border-b-[3px] border-slate-900 shadow-sm z-[100] flex-shrink-0 overflow-visible transition-transform duration-300 absolute top-0 left-0 right-0 lg:relative ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'}`}";
code = code.replace(oldHeader, newHeader);

// 2. Fix the Mode Indicator
// It was: <div className={`absolute left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1.5 rounded-full border-2 border-slate-900 font-black text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-40 whitespace-nowrap pointer-events-none transition-all duration-300 ${isHeaderVisible ? 'top-[84px] lg:top-4' : 'top-4'}`}>
//           {simulationMode === 'single' ? 'MODO: QUEDA LIVRE' : 'MODO: QUEDA SIMULTÂNEA'}
//         </div>
// Change it to:
const oldModeIndicator = `<div className={\`absolute left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1.5 rounded-full border-2 border-slate-900 font-black text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-40 whitespace-nowrap pointer-events-none transition-all duration-300 \${isHeaderVisible ? 'top-[84px] lg:top-4' : 'top-4'}\`}>
                {simulationMode === 'single' ? 'MODO: QUEDA LIVRE' : 'MODO: QUEDA SIMULTÂNEA'}
              </div>`;

const newModeIndicator = `<div className={\`absolute left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0 bg-white/95 px-4 py-1.5 rounded-full border-2 border-slate-900 font-black text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-20 whitespace-nowrap pointer-events-none top-4\`}>
                {simulationMode === 'paraquedas' ? 'MODO: QUEDA LIVRE' : 'MODO: QUEDA SIMULTÂNEA'}
              </div>`;
code = code.replace(oldModeIndicator, newModeIndicator);

fs.writeFileSync('src/App.tsx', code);
