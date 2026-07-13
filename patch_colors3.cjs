const fs = require('fs');
let content = fs.readFileSync('src/components/SimulationCanvas.tsx', 'utf8');

content = content.replace(
    "${env.id === 'moon' ? 'bg-[#1a1a2e]' : 'bg-[#F4F1EB]'}",
    "${env.id === 'moon' ? 'bg-[#1a1a2e]' : env.id === 'custom' ? 'bg-[#fad47c]' : 'bg-[#F4F1EB]'}"
);

fs.writeFileSync('src/components/SimulationCanvas.tsx', content);
console.log('Done 3!');
