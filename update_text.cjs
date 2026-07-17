const fs = require('fs');
let code = fs.readFileSync('src/components/TutorialModal.tsx', 'utf8');

code = code.replace(
  'projeto desenvolvido durante a diciplina de <span className="font-black tracking-wide">TÓPICOS ESPECIAIS EM FERRAMENTAS COMPUTACIONAIS PARA O ENSINO DE FÍSICA - T01</span> do periodo 2026.1 da universidade Federal de Sergipe',
  'Projeto desenvolvido durante a diciplina de <span className="font-black tracking-wide">TÓPICOS ESPECIAIS EM FERRAMENTAS COMPUTACIONAIS PARA O ENSINO DE FÍSICA - T01</span> do periodo <strong>2026.1</strong> da <strong>Universidade Federal de Sergipe</strong>'
);

fs.writeFileSync('src/components/TutorialModal.tsx', code);
console.log("Updated text");
