const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /<h4 className="text-\[10px\] font-black text-\[#FF3366\] uppercase tracking-widest mb-3">Cinemática<\/h4>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const replacement = `<h4 className="text-[10px] font-black text-[#FF3366] uppercase tracking-widest mb-3">Cinemática</h4>
            
            <div className="flex flex-col gap-3">
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Velocidade</div>
                  <div className="font-serif text-[15px] font-bold text-slate-900 text-center">
                     v = v<sub className="text-[10px]">0</sub> + gt
                  </div>
               </div>
               
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Posição (Altura)</div>
                  <div className="font-serif text-[15px] font-bold text-slate-900 text-center flex items-center justify-center gap-1">
                     <span>h = v<sub className="text-[10px]">0</sub>t + </span>
                     <div className="flex flex-col items-center justify-center text-[11px] leading-[0.8]">
                        <span className="border-b-[1.5px] border-slate-900 pb-[1px] w-full text-center">1</span>
                        <span className="pt-[2px]">2</span>
                     </div>
                     <span>gt²</span>
                  </div>
               </div>
               
               <div className="bg-white border-2 border-slate-200 rounded p-3">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Equação de Torricelli</div>
                  <div className="font-serif text-[15px] font-bold text-slate-900 text-center">
                     v² = v<sub className="text-[10px]">0</sub>² + 2gh
                  </div>
               </div>
               
               <div className="bg-white border-2 border-slate-200 rounded p-3 mt-1">
                  <div className="text-[10px] text-slate-500 uppercase font-black mb-2">Variáveis</div>
                  <ul className="text-[11px] font-medium text-slate-700 flex flex-col gap-1.5">
                     <li><strong className="font-serif text-[12px]">v</strong> = Velocidade final</li>
                     <li><strong className="font-serif text-[12px]">v<sub className="text-[9px]">0</sub></strong> = Velocidade inicial</li>
                     <li><strong className="font-serif text-[12px]">g</strong> = Aceleração da gravidade</li>
                     <li><strong className="font-serif text-[12px]">t</strong> = Tempo</li>
                     <li><strong className="font-serif text-[12px]">h</strong> = Altura / Deslocamento</li>
                  </ul>
               </div>
            </div>
          </div>`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated formulas");
