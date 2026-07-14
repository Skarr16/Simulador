const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /engine\.currentState\.yA <= 1200/g;
content = content.replace(regex, "engine.currentState.yA <= 2000");

fs.writeFileSync('src/App.tsx', content);
console.log('App patched with 2000');
