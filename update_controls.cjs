const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\/\/ Page 3: Controles de Execução[\s\S]*?\/\/ Page 3: Local e Configurações/;

const replacement = `// Page 3: Controles de Execução
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF3366]"></span>
          Controles
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4">
            Utilize os botões na tela para comandar a simulação:
          </p>
          
          <div className="flex justify-center gap-3 mb-6">
             <div className="bg-white p-2 border-2 border-slate-900 rounded-xl mb-4 flex flex-col gap-2 w-full">
                
                {/* Simulated toolbar (play) */}
                <div className="flex justify-center items-center gap-1 sm:gap-2">
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-[#00C48C] text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Play className="w-3 h-3 fill-current" /> Iniciar
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-slate-200 text-slate-400 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Wind className="w-3 h-3" /> Abrir
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-white text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </div>
                </div>

                {/* Simulated toolbar (pause) */}
                <div className="flex justify-center items-center gap-1 sm:gap-2">
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-[#FFB800] text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Square className="w-3 h-3 fill-current" /> Pausar
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-[#FF3366] text-white rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <Wind className="w-3 h-3" /> Abrir
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 px-1 sm:px-2 bg-white text-slate-900 rounded-lg border-[2px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] font-black uppercase text-[10px] sm:text-[11px]">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </div>
                </div>
                
             </div>
          </div>

          <ul className="list-disc ml-4 mb-6 space-y-2 text-[12px]">
            <li><strong>Iniciar / Pausar:</strong> O mesmo botão alterna entre iniciar (verde) e pausar (amarelo) a simulação.</li>
            <li><strong>Resetar:</strong> Retorna os objetos para o topo, no tempo zero.</li>
          </ul>
          
          <div className="bg-slate-100 p-3 rounded-xl border-2 border-slate-200">
             <h4 className="text-xs uppercase text-slate-500 mb-2 font-black flex items-center gap-1"><Wind className="w-3 h-3"/> Botão "Abrir"</h4>
             <p className="text-[11px] mb-2">
               Aparece <strong>apenas quando o Paraquedista é selecionado</strong> no Modo Queda Livre.
             </p>
             <div className="flex justify-center mb-2">
                <div className="px-4 py-2 bg-[#FF3366] border-2 border-slate-900 rounded-lg text-white font-black text-sm uppercase shadow-[2px_2px_0px_0px_#0f172a]">ABRIR</div>
             </div>
             <p className="text-[11px]">
               Aciona o paraquedas. Você deve usá-lo antes que ele colida com o chão em alta velocidade, para aumentar o arrasto do ar e realizar um pouso seguro.
             </p>
          </div>
        </div>
      </div>
    ),
    
    // Page 3: Local e Configurações`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated controls page");
