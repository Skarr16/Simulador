const fs = require('fs');

let content = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

// I will look for Page 5 and replace its content
const split1 = content.split('// Page 5: Controles (Combined)\n    (');
if (split1.length === 2) {
  const split2 = split1[1].split('// Page 6: Formulas Vacuo');
  if (split2.length === 2) {
    const page5Content = `
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FFB800]"></span>
          Controles
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            Após configurar o experimento, controle a simulação com os botões na parte inferior:
          </p>
          
          <div className="bg-slate-100 p-4 rounded-2xl mb-4 border-2 border-slate-200 flex items-center justify-center mx-auto shadow-inner">
             <div className="flex gap-2 w-full justify-center">
                <div className="flex items-center justify-center gap-1 px-3 py-2 bg-[#00C48C] text-slate-900 font-black rounded-xl border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-[10px] flex-1">
                   <Play className="w-3 h-3 fill-current" /> <span className="hidden sm:inline">INICIAR</span>
                </div>
                <div className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FFB800] text-slate-900 font-black rounded-xl border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-[10px] flex-1">
                   <Square className="w-3 h-3 fill-current" /> <span className="hidden sm:inline">PAUSAR</span>
                </div>
                <div className="flex items-center justify-center gap-1 px-3 py-2 bg-white text-slate-900 font-black rounded-xl border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-[10px] flex-1">
                   <RotateCcw className="w-3 h-3" /> <span className="hidden sm:inline">RESET</span>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-900 mt-1.5 shrink-0"></div>
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase">Tempo e Velocidade</div>
                   <div className="text-xs font-bold text-slate-600">No canto inferior direito você verá um display (ex: <strong className="text-slate-900 bg-white border border-slate-200 px-1 rounded shadow-sm">00:00.00</strong>) marcando o tempo da queda. Você também pode acelerar o tempo usando o botão <strong className="text-slate-900 bg-white border border-slate-200 px-1 rounded shadow-sm">{'>>'} 1x</strong>!</div>
                </div>
             </div>
             
             <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#FF3366] mt-1.5 shrink-0"></div>
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase text-[#FF3366]">Ação no Paraquedas</div>
                   <div className="text-xs font-bold text-slate-600">No modo Paraquedas, o botão <strong className="text-white bg-[#FF3366] border border-slate-900 px-1 rounded shadow-sm uppercase"><Zap className="w-3 h-3 inline" /> Abrir</strong> aparecerá. Clique antes de bater no chão! Você também pode clicar no botão de Informação (<strong>i</strong>) circular para ver os <strong>DADOS DA SIMULAÇÃO</strong> com as variáveis em tempo real.</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),
    `;
    
    content = split1[0] + '// Page 5: Controles (Combined)\n    (\n' + page5Content + '// Page 6: Formulas Vacuo' + split2[1];
    fs.writeFileSync('src/components/TutorialModal.tsx', content);
    console.log('Successfully patched Page 5');
  }
}

