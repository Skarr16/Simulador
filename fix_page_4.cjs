const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\/\/ Page 4: Alturas e Objetos[\s\S]*?\/\/ Page 5: Interface, Tabela e Gráficos/;

const replacement = `// Page 4: Alturas / Estruturas
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Alturas / Estruturas
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          
          <div className="bg-[#FAF9F6] p-3 rounded-xl border-2 border-slate-900 mt-2 mb-4 flex flex-col gap-3 shadow-[4px_4px_0px_0px_#0f172a]">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black uppercase text-slate-500">Alturas / Estruturas</span>
               <div className="bg-[#F4F1EB] border-2 border-slate-900 rounded-lg p-1.5 text-xs font-bold flex justify-between items-center">
                  <span className="text-slate-900">Personalizado</span>
                  <ChevronDown className="w-4 h-4 text-slate-900"/>
               </div>
             </div>
             
             <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center">
                   <span className="text-[11px] font-black uppercase text-slate-900">Altura Inicial Manual</span>
                   <div className="flex items-center gap-1">
                       <div className="border-2 border-slate-900 rounded-md px-3 py-1 text-[11px] font-bold bg-[#F4F1EB] text-slate-900">4000</div>
                       <span className="text-[11px] font-black text-slate-900">m</span>
                   </div>
                </div>
                <div className="flex items-center py-1">
                   <div className="w-full h-2 bg-[#e2e8f0] rounded-full relative border border-slate-300">
                       <div className="absolute top-1/2 -translate-y-1/2 left-0 h-2 bg-slate-900 rounded-l-full w-[30%]"></div>
                       <div className="absolute top-1/2 -translate-y-1/2 left-[30%] -translate-x-1/2 w-4 h-4 bg-[#0f172a] rounded-full shadow-sm"></div>
                   </div>
                </div>
                <div className="text-right text-[10px] font-mono text-slate-500">
                   Valor atual: 4000 m
                </div>
             </div>

             <div className="border-t border-slate-300 my-1"></div>

             <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                     <Wind className="w-4 h-4 text-slate-500" />
                     <span className="text-[11px] font-black uppercase text-slate-900">Resistência do Ar</span>
                 </div>
                 <div className="w-10 h-5 bg-[#00C48C] rounded-full border-2 border-slate-900 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 right-0.5 w-3 h-3 bg-white rounded-full border-2 border-slate-900"></div>
                 </div>
             </div>
          </div>

          <p className="text-[11px] mb-3 text-slate-600 text-center leading-tight">
            Você pode definir uma <strong>Altura Personalizada</strong> usando o slider, ligar/desligar a <strong>Resistência do Ar</strong> no simulador, ou escolher entre as estruturas famosas disponíveis.
          </p>

          <h4 className="text-[11px] uppercase text-slate-500 mb-3 font-black text-center mt-4">Estruturas Disponíveis</h4>
          <div className="grid grid-cols-2 gap-3">
             {[
               { name: 'Cristo Redentor', img: '/estruturas/cristo redentor.png', height: '38m' },
               { name: 'Torre de Pisa', img: '/estruturas/torre de pisa.png', height: '56m' },
               { name: 'Torre Eiffel', img: '/estruturas/torre effel.png', height: '93m' },
               { name: 'Pirâmide de Gizé', img: '/estruturas/piramide de gize.png', height: '138m' },
             ].map((obj, i) => (
               <div key={i} className="flex flex-col items-center justify-center bg-white p-2 rounded-xl border border-slate-200">
                  <img src={obj.img} className="w-8 h-8 object-contain mb-1" />
                  <span className="text-[10px] text-center font-black leading-tight text-slate-700">{obj.name}</span>
                  <span className="text-[9px] text-center font-bold text-slate-400">{obj.height}</span>
               </div>
             ))}
          </div>
          
        </div>
      </div>
    ),
    
    // Page 5: Interface, Tabela e Gráficos`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated page 4 of tutorial");
