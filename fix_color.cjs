const fs = require('fs');
let code = fs.readFileSync('src/components/QrCodeModal.tsx', 'utf8');

code = code.replace(/#0055FF/g, '#7C3AED');

fs.writeFileSync('src/components/QrCodeModal.tsx', code);
console.log("Updated color");
