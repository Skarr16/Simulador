const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldSound = `    // Impact
    if (engine.currentState.yA <= 0 && prevYA.current > 0) {
      if (engine.objectA.id === 'skydiver') {
        soundEngine.playWhatsapp();
      } else if (engine.objectA.id === 'customA' || engine.objectA.id === 'customB') {
        soundEngine.playImpact(Math.max(prevVA.current, 10));
      } else {
        soundEngine.playMetallicImpact(Math.max(prevVA.current, 10));
      }
    }
    if (engine.currentState.yB <= 0 && prevYB.current > 0 && config.simulationMode !== 'paraquedas') {
      if (engine.objectB.id === 'skydiver') {
        soundEngine.playWhatsapp();
      } else if (engine.objectB.id === 'customA' || engine.objectB.id === 'customB') {
        soundEngine.playImpact(Math.max(prevVB.current, 10));
      } else {
        soundEngine.playMetallicImpact(Math.max(prevVB.current, 10));
      }
    }`;

const newSound = `    // Impact
    if (engine.currentState.yA <= 0 && prevYA.current > 0) {
      if (engine.objectA.id === 'skydiver') {
        soundEngine.playWhatsapp();
      } else if (['customA', 'customB', 'book', 'soccer'].includes(engine.objectA.id)) {
        soundEngine.playImpact(Math.max(prevVA.current, 10));
      } else if (['paper_crumpled', 'paper_flat', 'feather'].includes(engine.objectA.id)) {
        soundEngine.playSoftImpact(Math.max(prevVA.current, 10));
      } else {
        soundEngine.playMetallicImpact(Math.max(prevVA.current, 10));
      }
    }
    if (engine.currentState.yB <= 0 && prevYB.current > 0 && config.simulationMode !== 'paraquedas') {
      if (engine.objectB.id === 'skydiver') {
        soundEngine.playWhatsapp();
      } else if (['customA', 'customB', 'book', 'soccer'].includes(engine.objectB.id)) {
        soundEngine.playImpact(Math.max(prevVB.current, 10));
      } else if (['paper_crumpled', 'paper_flat', 'feather'].includes(engine.objectB.id)) {
        soundEngine.playSoftImpact(Math.max(prevVB.current, 10));
      } else {
        soundEngine.playMetallicImpact(Math.max(prevVB.current, 10));
      }
    }`;

content = content.replace(oldSound, newSound);
fs.writeFileSync('src/App.tsx', content);
