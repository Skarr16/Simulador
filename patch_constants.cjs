const fs = require('fs');
let content = fs.readFileSync('src/lib/constants.ts', 'utf8');

content = content.replace(
  "custom: { id: 'custom', name: 'Personalizado', mass: 1, area: 1, cd: 1.05, color: '#888', radius: 140, image: '/objetos/caixa (1).png' },",
  "customA: { id: 'customA', name: 'Personalizado A', mass: 1, area: 1, cd: 1.05, color: '#888', radius: 140, image: '/objetos/caixa (1).png' },\n  customB: { id: 'customB', name: 'Personalizado B', mass: 1, area: 1, cd: 1.05, color: '#888', radius: 140, image: '/objetos/caixa (1).png' },"
);

fs.writeFileSync('src/lib/constants.ts', content);
