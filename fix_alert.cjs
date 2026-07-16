const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(
  /    if \(this\.ctx\.state === 'suspended'\) \{\n      this\.ctx\.resume\(\)\.catch\(\(\) => \{\}\);\n    \}\n    if \(this\.ctx\.state === 'suspended'\) \{\n      this\.ctx\.resume\(\)\.catch\(\(\) => \{\}\);\n    \}/g,
  `    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }`
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed double resume");
