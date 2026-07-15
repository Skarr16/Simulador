const fs = require('fs');

let codeApp = fs.readFileSync('src/App.tsx', 'utf8');
const gravityCode = `              <div className="absolute left-3 top-14 md:left-[60px] md:top-16 z-[60] bg-white border-[2px] md:border-[3px] border-slate-900 rounded-xl px-2 py-1 sm:px-3 sm:py-1.5 shadow-[2px_2px_0px_0px_#0f172a] md:shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center justify-center leading-none">
                <span className="text-[10px] sm:text-xs font-black uppercase text-slate-500">Gravidade</span>
                <span className="text-sm sm:text-lg font-black text-slate-900 tabular-nums leading-none">
                  {engine.env.g.toFixed(2)} <span className="text-xs sm:text-sm font-bold ml-0.5 text-slate-700">m/s²</span>
                </span>
              </div>`;

const modeCodeOld = "              <div className={`absolute left-3 top-3 md:left-4 md:top-4 bg-white/95 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border-[2px] border-slate-900 font-black text-[11px] sm:text-xs md:text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] z-20 whitespace-nowrap pointer-events-none`}>\n                {simulationMode === 'paraquedas' ? 'MODO: QUEDA LIVRE' : 'MODO: QUEDA SIMULTÂNEA'}\n              </div>";

const newOverlay = `              <div className="absolute left-3 top-3 md:left-4 md:top-4 z-20 flex flex-col items-start gap-2 pointer-events-none">
                <div className="bg-white/95 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border-[2px] border-slate-900 font-black text-[11px] sm:text-xs md:text-sm text-slate-800 shadow-[2px_2px_0px_0px_#0f172a] whitespace-nowrap">
                  {simulationMode === 'paraquedas' ? 'MODO: QUEDA LIVRE' : 'MODO: QUEDA SIMULTÂNEA'}
                </div>
                {toggles.showGravity && (
                  <div className="bg-white border-[2px] md:border-[3px] border-slate-900 rounded-xl px-2 py-1 sm:px-3 sm:py-1.5 shadow-[2px_2px_0px_0px_#0f172a] md:shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center justify-center leading-none self-start">
                    <span className="text-[10px] sm:text-xs font-black uppercase text-slate-500">Gravidade</span>
                    <span className="text-sm sm:text-lg font-black text-slate-900 tabular-nums leading-none">
                      {engine.env.g.toFixed(2)} <span className="text-xs sm:text-sm font-bold ml-0.5 text-slate-700">m/s²</span>
                    </span>
                  </div>
                )}
              </div>`;

codeApp = codeApp.replace(modeCodeOld, newOverlay);
fs.writeFileSync('src/App.tsx', codeApp);

let codeCanvas = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');
const gravityOld = /\{showGravity && \([\s\S]*?\}\)/;
codeCanvas = codeCanvas.replace(gravityOld, '');
fs.writeFileSync('src/components/SimulationCanvas.tsx', codeCanvas);
