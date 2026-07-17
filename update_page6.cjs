const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\/\/ Page 6: Teoria Atmosfera \/ Arrasto[\s\S]*?\];/;

const replacement = `// Page 6: Conceitos Físicos (Queda Livre)
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0055FF]"></span>
          Conceitos Físicos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-[12px] font-bold text-slate-600 leading-relaxed mb-4">
            Em um cenário ideal (<strong>Queda Livre</strong>) no vácuo, não há resistência do ar. A única força atuando é o Peso (Gravidade).
          </p>
          
          <div className="bg-[#FAF9F6] p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] mb-4">
            <h4 className="text-[10px] font-black text-[#FF3366] uppercase tracking-widest mb-3">Cinemática</h4>
            
            <div className="flex flex-col gap-3">
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Velocidade</div>
                  <div className="font-mono text-[13px] font-bold text-slate-900 text-center">
                     v = g · t
                  </div>
               </div>
               
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Posição (Altura)</div>
                  <div className="font-mono text-[13px] font-bold text-slate-900 text-center">
                     y = y_0 - ½ · g · t²
                  </div>
               </div>
               
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Equação de Torricelli</div>
                  <div className="font-mono text-[13px] font-bold text-slate-900 text-center">
                     v² = v_0² + 2 · g · Δy
                  </div>
               </div>
            </div>
          </div>
          
          <p className="text-[11px] text-slate-600 font-medium text-center">
            Nessas condições, todos os objetos caem com a mesma aceleração (<strong>g</strong>), independentemente de suas massas.
          </p>
        </div>
      </div>
    ),
    
    // Page 7: Conceitos Físicos (Arrasto)
    (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-black uppercase text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00C48C]"></span>
          Conceitos Físicos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <p className="text-[12px] font-bold text-slate-600 leading-relaxed mb-4">
            Com a atmosfera (Terra), o ar gera uma força oposta ao movimento, chamada <strong>Força de Arrasto</strong>.
          </p>
          
          <div className="bg-[#FAF9F6] p-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Parâmetros</h4>
            
            <div className="bg-[#1e293b] text-[#00C48C] font-black p-4 rounded-xl text-center mb-4 text-base tracking-wide flex justify-center items-center">
              F<sub className="text-[10px] lowercase -mt-1 ml-0.5 mr-2">a</sub> = <span className="mx-1">½</span> · <span className="mx-1">ρ</span> · <span className="mx-1">v²</span> · C<sub className="text-[10px] lowercase -mt-1 ml-0.5">d</sub> · A
            </div>
            
            <div className="flex flex-col gap-3">
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">ρ</strong> (Densidade do ar)</span>
                  <span className="text-[11px] font-medium text-slate-800">1.225 kg/m³</span>
               </div>
               
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">C<sub className="text-[8px] ml-px">d</sub></strong> (Coef. de arrasto)</span>
                  <span className="text-[11px] font-medium text-slate-800">1</span>
               </div>
               
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">A</strong> (Área de seção)</span>
                  <span className="text-[11px] font-medium text-slate-800">0.35 m²</span>
               </div>
               
               <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600"><strong className="text-slate-900 text-[12px]">m</strong> (Massa)</span>
                  <span className="text-[11px] font-medium text-slate-800">75 kg</span>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  ];`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated page 6 and 7");
