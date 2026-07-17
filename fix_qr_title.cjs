const fs = require('fs');
let code = fs.readFileSync('src/components/QrCodeModal.tsx', 'utf8');

code = code.replace(
  '<h2 className="text-lg font-black text-white uppercase tracking-tight">Compartilhar Simulador</h2>',
  '<h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Compartilhar Simulador</h2>'
);

fs.writeFileSync('src/components/QrCodeModal.tsx', code);
console.log("Updated title color");
