const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /animate-pulse/g;
content = content.replace(regex, "animate-alert-blink");

fs.writeFileSync('src/App.tsx', content);
console.log('App patched with alert-blink');
