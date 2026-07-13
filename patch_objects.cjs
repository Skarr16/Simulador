const fs = require('fs');
let content = fs.readFileSync('src/lib/constants.ts', 'utf8');

// Move custom to the end
content = content.replace(
    /  custom: { id: 'custom', name: 'Personalizado', mass: 1, area: 0.1, cd: 0.5, color: '#888', radius: 140, image: '\/objetos\/caixa \(1\).png' },\n  astronaut: { id: 'astronaut', name: 'Astronauta', mass: 100.0, area: 0.9, cd: 1.2, color: '#A855F7', radius: 150 },/,
    "  astronaut: { id: 'astronaut', name: 'Astronauta', mass: 100.0, area: 0.9, cd: 1.2, color: '#A855F7', radius: 150 },\n  custom: { id: 'custom', name: 'Personalizado', mass: 1, area: 0.1, cd: 0.5, color: '#888', radius: 140, image: '/objetos/caixa (1).png' },"
);

fs.writeFileSync('src/lib/constants.ts', content);
console.log('Constants patched');
