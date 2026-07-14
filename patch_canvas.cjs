const fs = require('fs');
let code = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

const oldGravity = '<div className="absolute top-4 left-4 sm:left-6 sm:top-6 lg:top-20 lg:left-4 z-[60] bg-white border-[3px] border-slate-900 rounded-xl p-2 sm:p-3 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center justify-center">';
const newGravity = '<div className="absolute top-4 left-4 sm:left-6 sm:top-6 lg:top-16 lg:left-[60px] z-[60] bg-white border-[3px] border-slate-900 rounded-xl px-2 py-1 sm:px-3 sm:py-1.5 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center justify-center leading-none">';

code = code.replace(oldGravity, newGravity);

const oldLabel = '<span className="text-[10px] sm:text-xs font-black uppercase text-slate-500 mb-1">Gravidade</span>';
const newLabel = '<span className="text-[10px] sm:text-xs font-black uppercase text-slate-500">Gravidade</span>';

code = code.replace(oldLabel, newLabel);

fs.writeFileSync('src/components/SimulationCanvas.tsx', code);
