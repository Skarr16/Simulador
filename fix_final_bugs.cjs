const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix the parachute alert height limits to be relative to the initial height
const oldAlert = "(engine.currentState.yA <= 2000 && engine.currentState.yA > 600 && !engine.currentState.parachuteDeployedA && engine.isRunning) ? 'bg-red-600 animate-alert-blink' : 'bg-[#FF3366]'";
const newAlert = "(engine.currentState.yA <= config.height * 0.5 && engine.currentState.yA > config.height * 0.15 && !engine.currentState.parachuteDeployedA && engine.isRunning) ? 'bg-red-600 animate-alert-blink' : 'bg-[#FF3366]'";
codeApp = codeApp.replace(oldAlert, newAlert);

// 2. Fix the overflow of playback controls by using flex-wrap on sm: screens
const oldContainer = 'grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 shrink-0';
const newContainer = 'grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-4 shrink-0';
codeApp = codeApp.replace(oldContainer, newContainer);

// Update padding so they fit better before wrapping
// sm:px-6 to sm:px-4
// we might need a regex
codeApp = codeApp.replace(/sm:px-6/g, 'sm:px-3 md:px-5');

fs.writeFileSync('src/App.tsx', codeApp);
