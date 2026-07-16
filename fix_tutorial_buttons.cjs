const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const newControls = `          <div className="flex justify-center gap-3 mb-6">
             <div className="bg-white p-2 border-2 border-slate-900 rounded-xl mb-4 flex gap-1.5 sm:gap-2 w-full">
                <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-[#00C48C] text-slate-900 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                  <Play className="w-3 h-3 fill-current" /> Iniciar
                </div>
                <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-slate-200 text-slate-400 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                  <Square className="w-3 h-3 fill-current" /> Pausar
                </div>
                <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-slate-200 text-slate-400 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                  <Wind className="w-3 h-3" /> Abrir
                </div>
                <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-white text-slate-900 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                  <RotateCcw className="w-3 h-3" /> Reset
                </div>
             </div>
          </div>`;

code = code.replace(/<div className="flex justify-center gap-3 mb-6">[\s\S]*?<\/div>\n          <\/div>/m, newControls);

code = code.replace(/<ArrowDownToLine className="w-3 h-3"\/> Botão "Abrir"/, '<Wind className="w-3 h-3"/> Botão "Abrir"');
code = code.replace(/<div className="px-4 py-2 bg-gradient-to-b from-\[#00C48C\] to-\[#009B6F\] border-2 border-slate-900 rounded-lg text-white font-black text-sm uppercase shadow-\[0_4px_0_0_#0f172a\]">ABRIR<\/div>/, '<div className="px-4 py-2 bg-[#FF3366] border-2 border-slate-900 rounded-lg text-white font-black text-sm uppercase shadow-[2px_2px_0px_0px_#0f172a]">ABRIR</div>');

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated buttons");
