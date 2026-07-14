const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

const insertionPoint = `              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, showGravity: !toggles.showGravity })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Mostrar Gravidade</span>
                <div className={\`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors \${toggles.showGravity ? 'bg-[#00C48C]' : 'bg-slate-200'}\`}>
                  <div className={\`w-4 h-4 rounded-full shadow-sm transform transition-transform \${toggles.showGravity ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}\`} />
                </div>
              </button>`;

const newToggle = `              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, showGravity: !toggles.showGravity })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Mostrar Gravidade</span>
                <div className={\`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors \${toggles.showGravity ? 'bg-[#00C48C]' : 'bg-slate-200'}\`}>
                  <div className={\`w-4 h-4 rounded-full shadow-sm transform transition-transform \${toggles.showGravity ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}\`} />
                </div>
              </button>
              
              <button 
                type="button"
                onClick={() => setToggles({ ...toggles, devMode: !toggles.devMode })}
                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"
              >
                <span className="text-sm font-black uppercase text-slate-700">Modo Desenvolvedor (Estruturas)</span>
                <div className={\`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0.5 transition-colors \${toggles.devMode ? 'bg-[#FF3366]' : 'bg-slate-200'}\`}>
                  <div className={\`w-4 h-4 rounded-full shadow-sm transform transition-transform \${toggles.devMode ? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'}\`} />
                </div>
              </button>`;

code = code.replace(insertionPoint, newToggle);

fs.writeFileSync('src/components/SettingsDrawer.tsx', code);
