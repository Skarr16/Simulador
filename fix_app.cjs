const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /if \(target\.closest\('button'\)\) {\s+soundEngine\.playClick\(\);\s+}/,
  `if (target.closest('button')) {
        soundEngine.init();
        soundEngine.playClick();
      }`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed App.tsx sound engine init");
