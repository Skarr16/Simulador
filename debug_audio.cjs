const fs = require('fs');
let code = fs.readFileSync('src/lib/audio.ts', 'utf8');

code = code.replace(
  /} catch \(e\) \{\}/g,
  `} catch (e) { console.error("Audio load error:", e); }`
);

fs.writeFileSync('src/lib/audio.ts', code);
console.log("Added error logging");
