const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex1 = /\/\/ Page 1: Queda Livre[\s\S]*?\/\/ Page 2: Queda Simultânea/;
const replacement1 = `// Page 1: Queda Livre
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Queda Livre
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-4">
            Você joga com um único corpo e precisa interagir com a simulação. 
            Além dos três personagens principais, é possível escolher qualquer outro objeto ou utilizar o <strong>Objeto Personalizado</strong>.
          </p>
          <div className="flex flex-col items-center gap-4 mt-6">
             <div className="flex justify-around items-center w-full mb-2">
               <img src="/objetos/astronauta/astronalta caindo.png" className="w-16 h-16 object-contain"/>
               <img src="/objetos/et/et_caindo.png" className="w-16 h-16 object-contain"/>
               <img src="/objetos/paraquedas/boneco caindo (1).png" className="w-16 h-16 object-contain"/>
             </div>

             <div className="bg-white p-3 rounded-xl border border-slate-200 text-center w-full shadow-sm text-[11px] font-bold text-slate-500">
               Com o <strong>Objeto Personalizado</strong>, você pode modificar características como <em>massa</em>, <em>área</em> e <em>coeficiente de arrasto</em> através do painel de Configurações.
             </div>

             <div className="bg-[#FF3366]/10 p-4 rounded-xl border-2 border-[#FF3366] text-center w-full">
                <Wind className="w-6 h-6 text-[#FF3366] mx-auto mb-2" />
                <p className="text-xs text-[#FF3366]"><strong>Atenção:</strong> O paraquedas do paraquedista tem que ser aberto antes de cair no chão para um pouso seguro!</p>
             </div>
          </div>
        </div>
      </div>
    ),
    
    // Page 2: Queda Simultânea`;

code = code.replace(regex1, replacement1);

const regex2 = /\/\/ Page 2: Queda Simultânea[\s\S]*?\/\/ Page 3: Controles de Execução/;
const replacement2 = `// Page 2: Queda Simultânea
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Queda Simultânea
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin text-sm font-bold text-slate-600 leading-relaxed">
          <p className="mb-2 text-[12px]">
            Neste modo, você seleciona dois objetos diferentes para compará-los caindo juntos e analisar como a massa, área e o coeficiente de arrasto afetam a queda. 
            Você também pode selecionar os personagens principais como objetos.
          </p>

          <div className="bg-white p-3 rounded-xl border-2 border-slate-200 mt-4 mb-4 flex flex-col gap-2">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black uppercase text-[#FF3366]">Objeto em Queda</span>
               <div className="bg-[#F4F1EB] border-2 border-[#FF3366] rounded-lg p-1.5 text-xs font-bold flex justify-between items-center shadow-[2px_2px_0px_0px_#FF3366]">
                  <span className="text-slate-900">Personalizado A (1kg, 1m²)</span>
                  <ChevronDown className="w-4 h-4 text-slate-900"/>
               </div>
             </div>
             <div className="bg-[#f8fafc] p-3 rounded-xl border border-slate-200 mt-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-500">Massa</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-slate-300 rounded-md px-2 py-1.5 text-[11px] font-bold bg-white text-slate-900 shadow-sm">1</div>
                       <span className="text-[10px] font-black text-slate-500 w-4">kg</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-500">Área</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-slate-300 rounded-md px-2 py-1.5 text-[11px] font-bold bg-white text-slate-900 shadow-sm">1</div>
                       <span className="text-[10px] font-black text-slate-500 w-4">m²</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-500">Coef. Arrasto (Cd)</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-slate-300 rounded-md px-2 py-1.5 text-[11px] font-bold bg-white text-slate-900 shadow-sm">1,05</div>
                    </div>
                </div>
             </div>
             <p className="text-[11px] text-slate-500 mt-1 leading-tight text-center">
               Com os <strong>Objetos Personalizados</strong>, você pode modificar a massa, área e o coeficiente de arrasto através do painel de Configurações.
             </p>
          </div>
                    
          <h4 className="text-[11px] uppercase text-slate-500 mb-3 font-black text-center mt-4">Outros Objetos Disponíveis</h4>
          <div className="grid grid-cols-2 gap-3">
             {[
               { name: 'Bola de Boliche', img: '/objetos/bola de boliche.png' },
               { name: 'Bola de Futebol', img: '/objetos/bola de futebol.png' },
               { name: 'Bola de Golfe', img: '/objetos/bola de golf.png' },
               { name: 'Ping-Pong', img: '/objetos/bola de ping-pong.png' },
               { name: 'Papel Amassado', img: '/objetos/papel amassado.png' },
               { name: 'Folha de Papel', img: '/objetos/papel.png' },
               { name: 'Livro', img: '/objetos/livro.png' },
               { name: 'Pena', img: '/objetos/pena.png' }
             ].map((obj, i) => (
               <div key={i} className="flex flex-col items-center justify-center bg-white p-2 rounded-xl border border-slate-200">
                  <img src={obj.img} className="w-8 h-8 object-contain mb-1" />
                  <span className="text-[10px] text-center font-black leading-tight">{obj.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    ),
    // Page 3: Controles de Execução`;

code = code.replace(regex2, replacement2);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Rewrote page 1 and 2 of tutorial modal");
