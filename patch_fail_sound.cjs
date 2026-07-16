const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const search = `      if (failed && toggles.crashAlert) {
        engine.pause();
        setFailMessage('Acho que o seu paraquedista quis virar um mergulhador, mas sem água!😅 Tente novamente e acione o paraquedas a tempo');
      }
    }
  }, [engine.currentState, engine.isRunning, config.simulationMode, config.environmentId, engine.objectA, engine.objectB, engine.env]);`;

const replace = `      if (failed && toggles.crashAlert) {
        if (!failMessage) soundEngine.playWhatsapp();
        engine.pause();
        setFailMessage('Acho que o seu paraquedista quis virar um mergulhador, mas sem água!😅 Tente novamente e acione o paraquedas a tempo');
      }
    }
  }, [engine.currentState, engine.isRunning, config.simulationMode, config.environmentId, engine.objectA, engine.objectB, engine.env, toggles.crashAlert, failMessage]);`;

if (code.includes(search)) {
    code = code.replace(search, replace);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Patched successfully");
} else {
    console.log("Search block not found!");
}
