const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

const regex = /\{ name: 'Pena', img: '\/objetos\/pena\.png' \}\s*\]\.map/g;
const replacement = `{ name: 'Pena', img: '/objetos/pena.png' },
               { name: 'Personalizado', img: '/objetos/caixa (1).png' }
             ].map`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Added custom object to the list");
