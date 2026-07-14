const fs = require('fs');
let lines = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8').split('\n');
lines.splice(512, 543 - 513 + 1);
fs.writeFileSync('src/components/SettingsDrawer.tsx', lines.join('\n'));
