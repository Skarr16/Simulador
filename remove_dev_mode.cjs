const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

code = code.replace(
  /              <button \n                type="button"\n                onClick=\{\(\) => setToggles\(\{ \.\.\.toggles, devMode: !toggles\.devMode \}\)\}\n                className="flex items-center justify-between w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left"\n              >\n                <span className="text-sm font-black uppercase text-slate-700">Modo Desenvolvedor \(Estruturas\)<\/span>\n                <div className={`w-12 h-6 flex items-center border-2 border-slate-900 rounded-full p-0\.5 transition-colors \$\{toggles\.devMode \? 'bg-\[#FF3366\]' : 'bg-slate-200'\}`}>\n                  <div className={`w-4 h-4 rounded-full shadow-sm transform transition-transform \$\{toggles\.devMode \? 'translate-x-6 bg-white' : 'translate-x-0 bg-slate-500'\}`} \/>\n                <\/div>\n              <\/button>\n/g,
  ""
);

fs.writeFileSync('src/components/SettingsDrawer.tsx', code);
console.log("Removed Dev Mode toggle");
