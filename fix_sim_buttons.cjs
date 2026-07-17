const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\{\/\* Simulated toolbar \(play\) \*\/\}[\s\S]*?\{\/\* Simulated toolbar \(pause\) \*\/\}[\s\S]*?<\/div>\n\s*<\/div>/;

const replacement = `{/* Simulated toolbar (no parachutist) */}
                <div className="flex justify-center items-center gap-1 sm:gap-2 mb-2">
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-[#00C48C] text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Play className="w-3 h-3 fill-current" /> Iniciar
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-2 bg-white text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </div>
                </div>

                {/* Simulated toolbar (parachutist & playing) */}
                <div className="flex justify-center items-center gap-1 sm:gap-2">
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

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed sim buttons");
