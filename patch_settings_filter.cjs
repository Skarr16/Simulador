const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

// The lines are currently:
// {Object.values(customObjects)
//                     
//                     .map(obj => (
content = content.replace(
    /\{Object\.values\(customObjects\)\s*\.map/g,
    "{Object.values(customObjects)\n                    .filter(obj => obj.id !== 'astronaut' || config.environmentId !== 'earth')\n                    .map"
);

fs.writeFileSync('src/components/SettingsDrawer.tsx', content);
console.log('Settings filter patched');
