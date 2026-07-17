const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

code = code.replace(
  '<Settings2 className="w-6 h-6 text-slate-900" />',
  '<Settings2 className="w-6 h-6 text-white" />'
);

code = code.replace(
  '<h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Configurações</h2>',
  '<h2 className="text-xl font-black text-white uppercase tracking-tight">Configurações</h2>'
);

fs.writeFileSync('src/components/SettingsDrawer.tsx', code);
console.log("Updated settings text color");
