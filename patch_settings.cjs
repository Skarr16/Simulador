const fs = require('fs');
let content = fs.readFileSync('src/components/SettingsDrawer.tsx', 'utf8');

// replace {config.simulationMode !== 'paraquedas' && (<div><label>Alturas / Estruturas</label>...</div>)} with just the div block
const target = "{config.simulationMode !== 'paraquedas' && (\n                <div>\n                  <label className=\"block text-xs font-black text-slate-500 mb-2 uppercase\">Alturas / Estruturas</label>";
if (content.includes(target)) {
    content = content.replace(
        /\{config\.simulationMode !== 'paraquedas' && \(\s*(<div>\s*<label className="block text-xs font-black text-slate-500 mb-2 uppercase">Alturas \/ Estruturas<\/label>[\s\S]*?<\/select>\s*<\/div>)\s*\)\}/,
        '$1'
    );
    console.log("Replaced!");
} else {
    console.log("Target not found!");
}
fs.writeFileSync('src/components/SettingsDrawer.tsx', content);
