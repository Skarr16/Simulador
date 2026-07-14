const fs = require('fs');
let content = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const oldLocais = `          <div className="flex justify-around mb-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-[3px] border-slate-900 mb-1 shadow-[2px_2px_0px_0px_#0f172a]">
                <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=150" alt="Earth" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-black uppercase text-slate-700">Terra: g=9.81<br/>Tem Atmosfera</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-[3px] border-slate-900 mb-1 shadow-[2px_2px_0px_0px_#0f172a]">
                <img src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=150" alt="Moon" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-black uppercase text-slate-700">Lua: g=1.62<br/>Vácuo (sem ar)</span>
            </div>
          </div>`;

const newLocais = `          <div className="flex justify-around mb-4">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto border-[3px] border-slate-900 mb-1 shadow-[2px_2px_0px_0px_#0f172a]">
                <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=150" alt="Earth" className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] sm:text-[11px] font-black uppercase text-slate-700">Terra: g=9.81<br/>(Paraquedista)</span>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto border-[3px] border-slate-900 mb-1 shadow-[2px_2px_0px_0px_#0f172a]">
                <img src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=150" alt="Moon" className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] sm:text-[11px] font-black uppercase text-slate-700">Lua: g=1.62<br/>(Astronauta)</span>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto border-[3px] border-slate-900 mb-1 shadow-[2px_2px_0px_0px_#0f172a] bg-[#fad47c] flex items-center justify-center">
                <span className="text-2xl">👽</span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-black uppercase text-slate-700">Person.: g=3.71<br/>(ET)</span>
            </div>
          </div>`;

content = content.replace(oldLocais, newLocais);

const oldText1 = `          <p className="text-xs font-bold text-slate-600 bg-white p-3 rounded-lg border-2 border-slate-200">
            Você também pode definir uma altura <strong>Personalizada</strong> nas configurações de Alturas.
          </p>`;

const newText1 = `          <p className="text-xs font-bold text-slate-600 bg-white p-3 rounded-lg border-2 border-slate-200">
            Cada local possui uma força g (gravidade) diferente e começa com um objeto especial diferente (Paraquedista na Terra, Astronauta na Lua, e ET no local Personalizado).
          </p>`;

content = content.replace(oldText1, newText1);

fs.writeFileSync('src/components/TutorialModal.tsx', content);
