const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldCanvas = `            <div className="w-full h-[100dvh] sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex lg:rounded-2xl lg:shadow-[6px_6px_0px_0px_#0f172a] lg:border-[3px] lg:border-slate-900 overflow-hidden bg-white">`;
const newCanvas = `            <div className="w-full h-[100dvh] sm:h-[550px] lg:h-auto lg:flex-1 pointer-events-auto flex relative lg:rounded-2xl lg:shadow-[6px_6px_0px_0px_#0f172a] lg:border-[3px] lg:border-slate-900 overflow-hidden bg-white">
              
              {/* Mode Indicator */}
              <div className="absolute top-[80px] lg:top-4 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1.5 rounded-full border-2 border-slate-900 font-black text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-40 whitespace-nowrap pointer-events-none transition-transform duration-300">
                {simulationMode === 'single' ? 'MUDO: QUEDA LIVRE' : 'MUDO: QUEDA SIMULTÂNEA'}
              </div>`;

code = code.replace(oldCanvas, newCanvas);

const oldControls = `<div className={\`absolute bottom-4 left-4 right-4 z-50 lg:static lg:mt-4 pointer-events-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0 transition-transform duration-300 \${isHeaderVisible ? 'translate-y-0' : 'translate-y-[150%] lg:translate-y-0'}\`}>`;
const newControls = `<div className={\`absolute bottom-4 left-4 right-4 z-50 lg:static lg:mt-4 pointer-events-auto bg-white p-3 sm:p-4 rounded-2xl shadow-[6px_6px_0px_0px_#0f172a] border-[3px] border-slate-900 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0 transition-transform duration-300 translate-y-0\`}>`;

code = code.replace(oldControls, newControls);

fs.writeFileSync('src/App.tsx', code);
