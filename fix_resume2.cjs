const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

const regex = /if \(!this\.isEnabled \|\| !this\.ctx \|\| !this\.masterGain\) return;/g;
const replacement = `if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Fixed resume for all methods");
