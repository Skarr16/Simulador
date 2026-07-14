const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');
content = content.replace(/customAA/g, 'customA');
fs.writeFileSync('src/components/SettingsDrawer.tsx', content);
