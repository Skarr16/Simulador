const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

content = content.replace(
    /\$\{env.id === 'moon' \? 'bg-\\[#64748b\\]' : 'bg-\\[#00C48C\\]'\}/,
    "${env.id === 'moon' ? 'bg-[#64748b]' : env.id === 'custom' ? 'bg-[#983311]' : 'bg-[#00C48C]'}"
);

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
console.log('Done ground color');
