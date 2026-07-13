const fs = require('fs');

let content = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const split1 = content.split('// Page 6: Formulas Vacuo');

if (split1.length === 2) {
  const newPage6Content = `
    // Page 6: Interface & Exibição
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Interface & Exibição
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-sm font-bold text-slate-600 leading-relaxed mb-4">
            A barra lateral de configurações permite ativar diversos recursos visuais e analíticos:
          </p>
          
          <div className="space-y-4">
             <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <Settings2 className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase">Mostrar Gravidade</div>
                   <div className="text-xs font-bold text-slate-600">Ative o interruptor nas configurações para exibir um medidor com o valor atual da aceleração da gravidade (ex: 9.81 m/s²) direto no cenário.</div>
                </div>
             </div>
             
             <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <ChartIcon className="w-5 h-5 text-[#FF3366] shrink-0 mt-0.5" />
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase">Gráficos de Queda</div>
                   <div className="text-xs font-bold text-slate-600">Acompanhe em tempo real as curvas no painel lateral alternando as guias: <strong>Posição vs Tempo</strong> e <strong>Velocidade vs Tempo</strong> para ambos os objetos.</div>
                </div>
             </div>

             <div className="flex gap-3 bg-slate-50 p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <Activity className="w-5 h-5 text-[#0055FF] shrink-0 mt-0.5" />
                <div>
                   <div className="text-sm font-black text-slate-900 uppercase">Tabela de Dados</div>
                   <div className="text-xs font-bold text-slate-600">Acesse uma tabela detalhada onde você pode:
                     <ul className="list-disc ml-4 mt-1 space-y-1">
                        <li>Alternar entre os dados do <strong>Objeto A</strong> e do <strong>Objeto B</strong>.</li>
                        <li>Mudar o <strong>Intervalo</strong> de amostragem dos dados (ex: 0.67s, 1.0s, etc).</li>
                        <li>Baixar um arquivo Excel clicando no botão <strong className="text-slate-900 bg-[#00C48C] px-1 rounded border border-slate-900">Baixar Excel</strong> com todos os resultados.</li>
                     </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),
    // Page 7: Formulas Vacuo`;
    
  content = split1[0] + newPage6Content + split1[1];
  
  // Also fix "Page 7: Formulas Ar" to "Page 8: Formulas Ar" if exists
  content = content.replace('// Page 7: Formulas Ar', '// Page 8: Formulas Ar');
  
  fs.writeFileSync('src/components/TutorialModal.tsx', content);
  console.log('Successfully added Page 6');
} else {
  console.log('Failed to find split point');
}

