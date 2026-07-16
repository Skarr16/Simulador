const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(
  /    } catch \(e\) \{\n      console\.error\('AudioContext not supported'\);\n    \}/,
  ""
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed init dangling catch");
