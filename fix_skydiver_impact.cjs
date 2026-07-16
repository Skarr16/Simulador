const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /if \(engine\.objectA\.id === 'skydiver'\) {\s+soundEngine\.playWhatsapp\(\);\s+}/g,
  `if (engine.objectA.id === 'skydiver') {
        soundEngine.playSoftImpact(Math.max(prevVA.current, 10));
        soundEngine.playWhatsapp();
      }`
);

code = code.replace(
  /if \(engine\.objectB\.id === 'skydiver'\) {\s+soundEngine\.playWhatsapp\(\);\s+}/g,
  `if (engine.objectB.id === 'skydiver') {
        soundEngine.playSoftImpact(Math.max(prevVB.current, 10));
        soundEngine.playWhatsapp();
      }`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed skydiver impact");
