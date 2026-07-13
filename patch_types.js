const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf-8');
code = code.replace("color: string;", "color: string;\n  diameterInfo?: string;");
fs.writeFileSync('src/types.ts', code);
