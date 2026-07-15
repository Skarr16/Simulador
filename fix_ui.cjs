const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// Mode Indicator in App.tsx
const oldMode = 'className={`absolute left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 bg-white/95 px-4 py-1.5 rounded-full border-2 border-slate-900 font-black text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-20 whitespace-nowrap pointer-events-none top-4`}';
const newMode = 'className={`absolute left-3 top-3 md:left-4 md:top-4 bg-white/95 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border-[2px] border-slate-900 font-black text-[11px] sm:text-xs md:text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-20 whitespace-nowrap pointer-events-none`}';
codeApp = codeApp.replace(oldMode, newMode);

// App.tsx min-h-[500px] -> maybe reduce this or make flex-1 handle it
const oldParent = '<div className="w-full flex-1 min-h-[500px] md:min-h-0 flex flex-col relative md:shrink md:p-0">';
const newParent = '<div className="w-full flex-1 flex flex-col relative md:shrink md:p-0">';
codeApp = codeApp.replace(oldParent, newParent);

fs.writeFileSync('src/App.tsx', codeApp);

let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');
const oldGravity = '<div className="absolute top-4 left-4 sm:left-6 sm:top-6 md:top-16 md:left-[60px] z-[60] bg-white border-[3px] border-slate-900 rounded-xl px-2 py-1 sm:px-3 sm:py-1.5 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center justify-center leading-none">';
const newGravity = '<div className="absolute top-12 left-3 sm:left-6 sm:top-6 md:top-16 md:left-[60px] z-[60] bg-white border-[2px] md:border-[3px] border-slate-900 rounded-xl px-2 py-1 sm:px-3 sm:py-1.5 shadow-[2px_2px_0px_0px_#0f172a] md:shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center justify-center leading-none">';
codeCanvas = codeCanvas.replace(oldGravity, newGravity);
fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);
