const fs = require('fs');
let code = fs.readFileSync('src/lib/constants.ts', 'utf8');

code = code.replace(/cd: 0\.25/, 'cd: 0.44');

fs.writeFileSync('src/lib/constants.ts', code);
console.log("Updated soccer ball drag coefficient.");
