const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

code = code.replace(/Área do Corpo \(Queda Livre\)/g, "Área do Corpo (Queda Simultânea)");

fs.writeFileSync('src/components/SettingsDrawer.tsx', code);
console.log("Updated SettingsDrawer labels");
