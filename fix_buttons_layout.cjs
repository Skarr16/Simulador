const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /<div className="flex justify-center gap-3 mb-6">[\s\S]*?<\/div>\s*<\/div>/;

const replacement = `<div className="flex flex-col gap-3 mb-6 w-full">
             {/* Simulated toolbar (no parachutist / initial) */}
             <div className="bg-white p-2 border-2 border-slate-900 rounded-xl flex items-center gap-2 w-full">
                  <div className="flex-[3] flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-[#00C48C] text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Play className="w-3 h-3 fill-current" /> Iniciar
                  </div>
                  <div className="flex-[4] flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-white text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </div>
             </div>

             {/* Simulated toolbar (parachutist & playing) */}
             <div className="bg-white p-2 border-2 border-slate-900 rounded-xl flex items-center gap-2 w-full">
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-[#FFB800] text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Square className="w-3 h-3 fill-current" /> Pausar
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-[#FF3366] text-white rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Wind className="w-3 h-3" /> Abrir
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-white text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </div>
             </div>
          </div>`;

code = code.replace(regex, replacement);

const regexAbrir = /<div className="px-4 py-2 bg-\[#FF3366\] border-2 border-slate-900 rounded-lg text-white font-black text-sm uppercase shadow-\[2px_2px_0px_0px_#0f172a\]">ABRIR<\/div>/;
const replacementAbrir = `<div className="flex items-center gap-1.5 px-4 py-2 bg-[#FF3366] border-2 border-slate-900 rounded-lg text-white font-black text-sm uppercase shadow-[2px_2px_0px_0px_#0f172a]"><Wind className="w-4 h-4"/> ABRIR</div>`;

code = code.replace(regexAbrir, replacementAbrir);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed button layout");
