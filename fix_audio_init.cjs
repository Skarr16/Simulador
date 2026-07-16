const fs = require('fs');
let codeApp = fs.readFileSync('src/App.tsx', 'utf8');

const search = 'onClick={engine.start}';
const replace = 'onClick={() => { soundEngine.init(); engine.start(); }}';

codeApp = codeApp.replace(search, replace);
fs.writeFileSync('src/App.tsx', codeApp);
