const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /<div className="bg-white p-3 rounded-xl border-2 border-slate-200 mt-4 mb-4 flex flex-col gap-2">[\s\S]*?<\/div>\s*<h4/g;

const replacement = `<div className="bg-[#FAF9F6] p-3 rounded-xl border-2 border-slate-900 mt-4 mb-4 flex flex-col gap-2 shadow-[4px_4px_0px_0px_#0f172a]">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black uppercase text-[#FF3366]">Objeto em Queda</span>
               <div className="bg-[#F4F1EB] border-[2px] border-[#FF3366] rounded-lg p-1.5 text-xs font-bold flex justify-between items-center">
                  <span className="text-slate-900">Personalizado A (1kg, 1m²)</span>
                  <ChevronDown className="w-4 h-4 text-slate-900"/>
               </div>
             </div>
             <div className="bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0] mt-1 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-700">Massa</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-[#cbd5e1] rounded-md px-2 py-1.5 text-[11px] bg-white text-slate-900">1</div>
                       <span className="text-[10px] font-black text-slate-700 w-4">kg</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-700">Área</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-[#cbd5e1] rounded-md px-2 py-1.5 text-[11px] bg-white text-slate-900">1</div>
                       <span className="text-[10px] font-black text-slate-700 w-4">m²</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-700">Coef. Arrasto (Cd)</span>
                    <div className="flex items-center gap-2">
                       <div className="flex-1 border border-[#cbd5e1] rounded-md px-2 py-1.5 text-[11px] bg-white text-slate-900">1,05</div>
                    </div>
                </div>
             </div>
             <p className="text-[11px] text-slate-500 mt-1 leading-tight text-center">
               Com os <strong>Objetos Personalizados</strong>, você pode modificar a massa, área e o coeficiente de arrasto através do painel de Configurações.
             </p>
          </div>
                    
          <h4`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Fixed style for simultanea custom object");
