const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldTriggers = `        if (config.simulationMode === 'paraquedas' && config.objectAId === 'astronaut') {
          soundEngine.playAstronautShip();
        }`;

const newTriggers = `        if (config.simulationMode === 'paraquedas' && config.objectAId === 'astronaut') {
          soundEngine.playAstronautShip();
        }
        if (config.simulationMode === 'paraquedas' && config.objectAId === 'skydiver') {
          soundEngine.playAirplane();
        }`;

code = code.replace(oldTriggers, newTriggers);

const oldTriggers2 = `       if (config.simulationMode === 'paraquedas' && config.objectAId === 'astronaut' && toggles.sound) {
         soundEngine.playAstronautShip();
       }`;

const newTriggers2 = `       if (config.simulationMode === 'paraquedas' && config.objectAId === 'astronaut' && toggles.sound) {
         soundEngine.playAstronautShip();
       }
       if (config.simulationMode === 'paraquedas' && config.objectAId === 'skydiver' && toggles.sound) {
         soundEngine.playAirplane();
       }`;

code = code.replace(oldTriggers2, newTriggers2);

fs.writeFileSync('src/App.tsx', code);
