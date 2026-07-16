const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(
  /    if \(!this\.ctx\) \{/,
  `    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (!this.ctx) {`
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed resume");
